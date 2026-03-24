import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * POST /api/sections — Create a new section
 *
 * Stub for the future Wix-style drag-and-drop editor.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const section = await db.section.create({
      data: {
        pageId: body.pageId,
        type: body.type,
        order: body.order,
        content: body.content,
      },
    });

    return NextResponse.json(section, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create section' }, { status: 500 });
  }
}

/**
 * GET /api/sections — List sections for a page
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const pageId = searchParams.get('pageId');

    const sections = await db.section.findMany({
      where: pageId ? { pageId: parseInt(pageId, 10) } : undefined,
      orderBy: { order: 'asc' },
    });

    return NextResponse.json(sections);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sections' }, { status: 500 });
  }
}
