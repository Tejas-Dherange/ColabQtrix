'use client';

import React from 'react';
import { useEditor } from './EditorProvider';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import DynamicRenderer, { SectionData } from '@/lib/renderer';
import { GripVertical, Trash2, PlusCircle } from 'lucide-react';

export default function Canvas() {
    const { sections, selectedSectionId, setSelectedSectionId, setSections } = useEditor();

    const handleDelete = async (e: React.MouseEvent, id: number) => {
        e.stopPropagation();
        try {
            await fetch(`/api/sections/${id}`, { method: 'DELETE' });
            setSections((prev) => prev.filter((s) => s.id !== id));
            if (selectedSectionId === id) setSelectedSectionId(null);
        } catch (err) {
            console.error('Failed to delete section', err);
        }
    };

    return (
        <div className="w-full flex justify-center pb-32 min-h-full">
            <div className="w-full bg-white shadow-2xl min-h-[800px] transition-all relative">
                {/* Subtle grid background for empty state feeling */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-overlay" />

                {sections.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4">
                        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center border-2 border-dashed border-gray-200">
                            <PlusCircle size={32} className="text-gray-300" />
                        </div>
                        <p className="text-lg font-medium text-gray-500">Your canvas is empty</p>
                        <p className="text-sm">Click a component on the left to get started.</p>
                    </div>
                ) : (
                    sections.map((section) => (
                        <SortableSectionItem
                            key={section.id}
                            section={section}
                            isSelected={selectedSectionId === section.id}
                            onSelect={() => setSelectedSectionId(section.id)}
                            onDelete={(e) => handleDelete(e, section.id)}
                        />
                    ))
                )}
            </div>
        </div>
    );
}

function SortableSectionItem({
    section,
    isSelected,
    onSelect,
    onDelete,
}: {
    section: SectionData;
    isSelected: boolean;
    onSelect: () => void;
    onDelete: (e: React.MouseEvent) => void;
}) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: section.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : 1,
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative group cursor-pointer transition-all duration-200 ${isSelected
                ? 'ring-4 ring-blue-500/50 z-40 outline outline-2 outline-blue-600 outline-offset-[-2px]'
                : 'hover:ring-4 hover:ring-blue-400/30 z-10'
                } ${isDragging ? 'opacity-40 scale-[0.98] shadow-2xl blur-[1px]' : 'opacity-100'}`}
            onClick={onSelect}
        >
            {/* Editor Controls Overlay */}
            <div className={`absolute top-4 right-4 transition-all duration-200 z-50 flex gap-2 ${isSelected ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0'}`}>
                <div
                    {...attributes}
                    {...listeners}
                    className="p-2.5 bg-white/95 backdrop-blur shadow-lg border border-gray-100 rounded-xl cursor-grab active:cursor-grabbing text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                    title="Drag to reorder"
                >
                    <GripVertical size={18} />
                </div>
                <button
                    onClick={onDelete}
                    className="p-2.5 bg-white/95 backdrop-blur shadow-lg border border-red-100 rounded-xl text-red-500 hover:text-white hover:bg-red-500 transition-colors"
                    title="Delete Section"
                >
                    <Trash2 size={18} />
                </button>
            </div>

            {/* Render Actual Component */}
            <div className={`pointer-events-none relative z-10 w-full overflow-hidden transition-all duration-300 ${isDragging ? 'rounded-xl' : ''}`}>
                <DynamicRenderer sections={[section]} />
            </div>

            {/* Selection Overlay Tint */}
            {isSelected && !isDragging && (
                <div className="absolute inset-0 bg-blue-500/5 pointer-events-none z-20" />
            )}
        </div>
    );
}
