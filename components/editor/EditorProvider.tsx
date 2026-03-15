'use client';

import React, { createContext, useContext, useState } from 'react';
import { SectionData } from '@/lib/renderer';

interface EditorContextType {
    sections: SectionData[];
    setSections: React.Dispatch<React.SetStateAction<SectionData[]>>;
    selectedSectionId: number | null;
    setSelectedSectionId: (id: number | null) => void;
    pageId: number;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export function EditorProvider({
    children,
    initialSections,
    pageId,
}: {
    children: React.ReactNode;
    initialSections: SectionData[];
    pageId: number;
}) {
    const [sections, setSections] = useState<SectionData[]>(initialSections);
    const [selectedSectionId, setSelectedSectionId] = useState<number | null>(null);

    return (
        <EditorContext.Provider
            value={{
                sections,
                setSections,
                selectedSectionId,
                setSelectedSectionId,
                pageId,
            }}
        >
            {children}
        </EditorContext.Provider>
    );
}

export function useEditor() {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
}
