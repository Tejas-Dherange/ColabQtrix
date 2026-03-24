import { NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

export async function GET() {
  try {
    await db.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, message: 'Database connection is healthy.' });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown DB error';
    return NextResponse.json({ ok: false, message }, { status: 500 });
  }
}
