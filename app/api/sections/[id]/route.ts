import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * PATCH /api/sections/:id — Update section content
 * DELETE /api/sections/:id — Remove a section
 *
 * These are stubs prepared for the future Wix-style drag-and-drop editor.
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const body = await request.json();

    const updated = await db.section.update({
      where: { id },
      data: {
        content: body.content,
        order: body.order,
        type: body.type,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update section' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    await db.section.delete({ where: { id } });
    return NextResponse.json({ message: 'Section deleted' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete section' }, { status: 500 });
  }
}
