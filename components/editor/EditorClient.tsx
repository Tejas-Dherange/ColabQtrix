'use client';

import React, { useState } from 'react';
import { SectionData } from '@/lib/renderer';
import { EditorProvider, useEditor } from './EditorProvider';
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import LeftPanel from './LeftPanel';
import Canvas from './Canvas';
import RightPanel from './RightPanel';

export default function EditorClient({
    initialSections,
    pageId,
}: {
    initialSections: SectionData[];
    pageId: number;
}) {
    return (
        <EditorProvider initialSections={initialSections} pageId={pageId}>
            <EditorLayout />
        </EditorProvider>
    );
}

function EditorLayout() {
    const { sections, setSections } = useEditor();

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            setSections((items) => {
                const oldIndex = items.findIndex((i) => i.id === active.id);
                const newIndex = items.findIndex((i) => i.id === over.id);

                const newItems = arrayMove(items, oldIndex, newIndex);

                // Reassign order properties based on new index
                const updatedItems = newItems.map((item, index) => ({
                    ...item,
                    order: index + 1,
                }));

                // Fire API to save reorder
                saveReorder(updatedItems);
                return updatedItems;
            });
        }
    };

    const saveReorder = async (updatedSections: SectionData[]) => {
        try {
            await fetch('/api/sections/reorder', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sections: updatedSections.map((s) => ({ id: s.id, order: s.order })),
                }),
            });
        } catch (e) {
            console.error('Failed to save order', e);
        }
    };

    return (
        <div className="flex h-full w-full">
            {/* Left Panel - Component Library */}
            <LeftPanel />

            {/* Center Canvas - Drag and Drop Area */}
            <div className="flex-1 bg-gray-200 overflow-y-auto relative">
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCenter}
                    onDragEnd={handleDragEnd}
                >
                    <SortableContext
                        items={sections.map((s) => s.id)}
                        strategy={verticalListSortingStrategy}
                    >
                        <Canvas />
                    </SortableContext>
                </DndContext>
            </div>

            {/* Right Panel - Properties */}
            <RightPanel />
        </div>
    );
}
