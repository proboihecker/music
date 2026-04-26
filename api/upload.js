import { put } from '@vercel/blob';

export const config = { runtime: 'edge' };

export default async function handler(req) {
  if (req.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });

  const filename = req.headers.get('x-filename');
  if (!filename) return new Response('Missing filename', { status: 400 });

  const result = await put(filename, req.body, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN,  // safe — server side only
  });

  return Response.json({ url: result.url });
}