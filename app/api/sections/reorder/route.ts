import { NextRequest, NextResponse } from 'next/server';
import db from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * PUT /api/sections/reorder — Bulk reorder sections by updating the order column.
 *
 * Expected body: { updates: [{ id: number, order: number }] }
 *
 * Stub for the future Wix-style drag-and-drop editor.
 * When a user drags sections in the editor, this endpoint will be called
 * to persist the new order without reloading the page.
 */
export async function PUT(request: NextRequest) {
  try {
    const { sections } = await request.json() as {
      sections: { id: number; order: number }[];
    };

    // Batch update all orders in a transaction
    await db.$transaction(
      sections.map(({ id, order }) =>
        db.section.update({
          where: { id },
          data: { order },
        })
      )
    );

    return NextResponse.json({ message: `Reordered ${sections.length} sections` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to reorder sections' }, { status: 500 });
  }
}
