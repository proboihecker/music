import { put } from '@vercel/blob';

export default async function handler(req, res) {
  console.log('upload hit'); // check Vercel logs for this
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const filename = req.headers['x-filename'];
  if (!filename) return res.status(400).send('Missing filename');

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const buffer = Buffer.concat(chunks);

  const result = await put(filename, buffer, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  res.status(200).json({ url: result.url });
}