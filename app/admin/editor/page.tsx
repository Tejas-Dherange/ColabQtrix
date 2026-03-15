import db from '@/lib/db';
import EditorClient from '@/components/editor/EditorClient';

export const revalidate = 0;

export default async function EditorPage() {
    const page = await db.page.findUnique({
        where: { slug: 'home' },
        include: {
            sections: {
                orderBy: { order: 'asc' },
            },
        },
    });

    if (!page) {
        return <div className="p-8">Page not found. Ensure the database is seeded.</div>;
    }

    const sections = page.sections.map((s) => ({
        id: s.id,
        type: s.type,
        order: s.order,
        content: s.content as Record<string, any>,
    }));

    return (
        <div className="h-screen w-full overflow-hidden bg-gray-100 flex flex-col font-sans">
            <header className="h-14 bg-white border-b flex items-center justify-between px-6 shrink-0">
                <h1 className="font-semibold text-lg text-gray-800">ColabQtrix Editor</h1>
                <div className="text-sm text-gray-500">Editing: Home Page</div>
            </header>
            <main className="flex-1 flex overflow-hidden">
                <EditorClient initialSections={sections} pageId={page.id} />
            </main>
        </div>
    );
}
