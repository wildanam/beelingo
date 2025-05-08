import axios from 'axios';
import FormData from 'form-data';
import crypto from 'crypto';

export async function uploadToImageKit(fileBuffer: Buffer, fileName?: string): Promise<{ url: string; mimeType: string }> {
  const finalFileName = fileName || `translated-${crypto.randomUUID()}.docx`;

  const form = new FormData();
  form.append('file', fileBuffer, { filename: finalFileName });
  form.append('fileName', finalFileName);

  const auth = Buffer.from(`${process.env.IMAGEKIT_PRIVATE_KEY}:`).toString('base64');

  try {
    const res = await axios.post('https://upload.imagekit.io/api/v1/files/upload', form, {
      headers: {
        ...form.getHeaders(),
        Authorization: `Basic ${auth}`,
      },
      maxContentLength: Infinity,
      maxBodyLength: Infinity,
      timeout: 60000,
    });

    const data = res.data;

    const extension = finalFileName.split('.').pop();
    let mimeType = 'application/octet-stream';
    if (extension === 'pdf') mimeType = 'application/pdf';
    else if (extension === 'docx') mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';

    return { url: data.url, mimeType };
  } catch (error: any) {
    console.error('ImageKit upload failed:', error.response?.data || error.message);
    throw new Error(`ImageKit upload failed: ${error.message}`);
  }
}
