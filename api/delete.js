import { del } from '@vercel/blob';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const { urls } = await req.json();
  if (!urls?.length) return new Response('Missing urls', { status: 400 });

  await del(urls, { token: process.env.BLOB_READ_WRITE_TOKEN });
  return new Response('OK');
}