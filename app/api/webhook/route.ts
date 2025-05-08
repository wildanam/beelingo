import { NextResponse } from 'next/server';
import { Twilio } from 'twilio';
import { uploadToImageKit } from '@/utils/uploadToImageKit';

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

export async function POST(request: Request) {
  const formData = await request.formData();
  const from = formData.get('From') as string;
  const mediaUrl = formData.get('MediaUrl0') as string;
  const mediaType = formData.get('MediaContentType0') as string;

  if (!mediaUrl || !(mediaType.includes('pdf') || mediaType.includes('docx'))) {
    await twilioClient.messages.create({
      body: 'Please send PDF or DOCX files for translation.',
      from: 'whatsapp:' + process.env.TWILIO_NUMBER,
      to: from,
    });
    return NextResponse.json({ status: 'no-document' });
  }

  // Download the file from Twilio
  const response = await fetch(mediaUrl, {
    headers: { Authorization: `Basic ${Buffer.from(`${process.env.TWILIO_ACCOUNT_SID}:${process.env.TWILIO_AUTH_TOKEN}`).toString('base64')}` },
  });
  const arrayBuffer = await response.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  console.log('Fetching media from Twilio:', mediaUrl);
  console.log('Media type:', mediaType);

  // Upload to DeepL
  const form = new FormData();
  const fileExtension = mediaType.includes('pdf') ? 'pdf' : 'docx';
  console.log('Using file extension:', fileExtension);
  console.log('Buffer size (bytes):', fileBuffer.length);

  form.append('file', new Blob([fileBuffer]), `input.${fileExtension}`);
  form.append('target_lang', 'ID'); // Change as needed

  const deeplResponse = await fetch('https://api-free.deepl.com/v2/document', {
    method: 'POST',
    headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}` },
    body: form as any,
  });

  const deeplData = await deeplResponse.json();
  const { document_id, document_key } = deeplData;

  if (!document_id || !document_key) {
    await twilioClient.messages.create({
      body: 'Failed to upload document to DeepL.',
      from: 'whatsapp:' + process.env.TWILIO_NUMBER,
      to: from,
    });
    return NextResponse.json({ status: 'deepl-error' });
  }

  // Polling for translation
  let status = 'queued';
  while (status !== 'done') {
    await new Promise((r) => setTimeout(r, 5000));

    const statusRes = await fetch(`https://api-free.deepl.com/v2/document/${deeplData.document_id}?document_key=${document_key}`, {
      headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}` },
    });
    const statusJson = await statusRes.json();
    status = statusJson.status;

    console.log('DeepL status API response:', statusJson);
    console.log('Current translation status:', status);

    if (status === 'error') {
      await twilioClient.messages.create({
        body: 'An error occurred during translation.',
        from: 'whatsapp:' + process.env.TWILIO_NUMBER,
        to: from,
      });
      return NextResponse.json({ status: 'translation-error' });
    }
  }

  // Download translated result
  const resultRes = await fetch(`https://api-free.deepl.com/v2/document/${deeplData.document_id}/result?document_key=${document_key}`, {
    headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}` },
  });
  const resultBuffer = Buffer.from(await resultRes.arrayBuffer());

  // Upload result to ImageKit
  // const uploadedFile = await uploadToImageKit(resultBuffer, 'translated.docx');
  let uploadedFile;
  try {
    uploadedFile = await uploadToImageKit(resultBuffer, 'translated.docx');
    console.log('Uploaded file info:', uploadedFile);
  } catch (error) {
    console.error('ImageKit upload failed:', error);
    await twilioClient.messages.create({
      from: 'whatsapp:' + process.env.TWILIO_NUMBER,
      to: from,
      body: 'Failed to upload the translated document.',
    });
    return NextResponse.json({ status: 'imagekit-error' });
  }

  // Send document link back via WhatsApp
  try {
    await twilioClient.messages.create({
      from: 'whatsapp:' + process.env.TWILIO_NUMBER,
      to: from,
      body: 'Here is your translated document!',
      mediaUrl: [uploadedFile.url],
    });
    console.log('Successfully sent document back via WhatsApp');
  } catch (err) {
    console.error('Failed to send document back via WhatsApp:', err);
  }

  return NextResponse.json({ status: 'ok' });
}