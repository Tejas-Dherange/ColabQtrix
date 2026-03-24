import { NextResponse } from 'next/server';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

export const runtime = 'nodejs';

export async function GET() {
  const iconPath = path.join(process.cwd(), 'public', 'images', 'logo.png');
  const iconBuffer = await readFile(iconPath);

  return new NextResponse(iconBuffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
}
