import { NextResponse } from 'next/server';
import { Twilio } from 'twilio';

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

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

  // Sends to DeepL
  const form = new FormData();
  form.append('file', new Blob([fileBuffer]), 'input.docx');
  form.append('target_lang', 'ID'); // or 'EN', 'DE', etc.

  const deeplResponse = await fetch('https://api-free.deepl.com/v2/document', {
    method: 'POST',
    headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}` },
    body: form,
  });

  const deeplData = await deeplResponse.json();

  if (!deeplData.document_id) {
    await twilioClient.messages.create({
      body: 'Failed to upload document to DeepL.',
      from: 'whatsapp:' + process.env.TWILIO_NUMBER,
      to: from,
    });
    return NextResponse.json({ status: 'deepl-error' });
  }

  // Polling for translated result
  let status = 'queued';
  while (status !== 'done') {
    await new Promise((r) => setTimeout(r, 5000)); // wait for 5 seconds

    const statusRes = await fetch(`https://api-free.deepl.com/v2/document/${deeplData.document_id}`, {
      headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}` },
    });
    const statusJson = await statusRes.json();
    status = statusJson.status;

    if (status === 'error') {
      await twilioClient.messages.create({
        body: 'An error occurred while translating the document.',
        from: 'whatsapp:' + process.env.TWILIO_NUMBER,
        to: from,
      });
      return NextResponse.json({ status: 'translation-error' });
    }
  }

  // Download the result document
  const resultRes = await fetch(`https://api-free.deepl.com/v2/document/${deeplData.document_id}/result`, {
    headers: { Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}` },
  });
  const resultBuffer = Buffer.from(await resultRes.arrayBuffer());

  // (Meanwhile, sending text messages; uploading files back requires temporary storage like S3)
  await twilioClient.messages.create({
    body: 'Translation is complete! (sending of result files will be supported soon)',
    from: 'whatsapp:' + process.env.TWILIO_NUMBER,
    to: from,
  });

  return NextResponse.json({ status: 'ok' });
}
