import { NextResponse } from 'next/server';
import { Twilio } from 'twilio';

const twilioClient = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(request: Request) {
  const { from, mediaUrl, mediaType } = await request.json();

  try {
    // (Isi semua proses panjang kamu di sini: download file, kirim ke DeepL, polling, dsb)

    await twilioClient.messages.create({
      body: 'Translation is complete! (sending of result files will be supported soon)',
      from: 'whatsapp:' + process.env.TWILIO_NUMBER,
      to: from,
    });

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Error in background process:', error);
    await twilioClient.messages.create({
      body: 'An internal error occurred during translation.',
      from: 'whatsapp:' + process.env.TWILIO_NUMBER,
      to: from,
    });
    return NextResponse.json({ status: 'error' });
  }
}
