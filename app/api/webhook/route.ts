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

  // Fire-and-forget ke internal API
  fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/process-translation`, {
    method: 'POST',
    body: JSON.stringify({ from, mediaUrl, mediaType }),
    headers: { 'Content-Type': 'application/json' },
  }).catch((err) => console.error('Failed to trigger background:', err));

  return NextResponse.json({ status: 'processing' });
}
