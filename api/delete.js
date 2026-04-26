import { del } from '@vercel/blob';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { urls } = req.body;
  if (!urls?.length) return res.status(400).send('Missing urls');

  await del(urls, { token: process.env.BLOB_READ_WRITE_TOKEN });
  res.status(200).send('OK');
}