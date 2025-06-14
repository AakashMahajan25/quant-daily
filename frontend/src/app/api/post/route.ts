import { NextResponse } from 'next/server';
import { client } from '@/lib/sanity';

export async function POST(req: Request) {
  const body = await req.json();

  const post = await client.create({
    _type: 'post',
    title: body.title,
    author: body.author || 'Anonymous',
    isAakash: body.isAakash || false,
    publishedAt: new Date().toISOString(),
    slug: {
      current: body.title.toLowerCase().replace(/ /g, '-').slice(0, 50),
    },
    body: body.content, // This is Portable Text-compatible JSON
  });

  return NextResponse.json({ success: true, post });
}
