import db from '@/lib/db';
import DynamicRenderer from '@/lib/renderer';

export const revalidate = 0; // Always fresh from DB

export default async function PrivacyPage() {
  try {
    const page = await db.page.findUnique({
      where: { slug: 'privacy' },
      include: {
        sections: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!page || !page.isPublished) {
      return (
        <div className="min-h-screen flex items-center justify-center text-gray-500">
          <p>Page not found or not published.</p>
        </div>
      );
    }

    const sections = page.sections.map((s) => ({
      id: s.id,
      type: s.type,
      order: s.order,
      content: s.content as Record<string, any>,
    }));

    return <DynamicRenderer sections={sections} />;
  } catch (error) {
    console.error('[PrivacyPage] Failed to load page data', error);
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        <p>Temporary service issue. Please try again shortly.</p>
      </div>
    );
  }
}
