'use client';

import React from 'react';
import { useEditor } from './EditorProvider';
import { PlusCircle } from 'lucide-react';

const AVAILABLE_COMPONENTS = [
    { type: 'navbar', label: 'Navigation Bar' },
    { type: 'hero', label: 'Hero Section' },
    { type: 'about', label: 'About Us' },
    { type: 'why_choose_us', label: 'Why Choose Us' },
    { type: 'founder', label: 'Founder Message' },
    { type: 'how_it_works', label: 'How It Works' },
    { type: 'testimonials', label: 'Testimonials' },
    { type: 'contact', label: 'Contact' },
    { type: 'custom', label: 'Custom Section' },
];

// Default content stubs for new sections
const DEFAULT_CONTENT: Record<string, any> = {
    navbar: {
        logo: { text: 'ColabQtrix', icon: '' },
        links: [
            { label: 'Home', href: '#home' },
            { label: 'Contact', href: '#contact' }
        ],
        contactInfo: { email: 'info@colabqtrix.com', phone: '+1234567890' },
    },
    hero: {
        title: 'New Hero Title',
        subtitle: 'New hero subtitle goes here.',
        primaryButton: { label: 'Click Me', href: '#' },
        secondaryButton: { label: 'Learn More', href: '#' },
        image: '',
    },
    about: {
        heading: 'About Us',
        description: 'Enter description...',
    },
    why_choose_us: {
        heading: 'Why Choose Us',
        description: 'We are the best.',
        features: [],
    },
    founder: {
        heading: 'Founder',
        quote: 'Inspiring quote here.',
        founderName: 'Name',
        founderTitle: 'Title',
    },
    how_it_works: {
        heading: 'How It Works',
        steps: [],
    },
    testimonials: {
        heading: 'Testimonials',
        testimonials: [],
    },
    contact: {
        heading: 'Contact Us',
        subheading: 'Get in touch',
        emails: [],
        phones: [],
    },
    custom: {
        backgroundColor: '#f9fafb',
        textColor: '#111827',
        padding: 'py-16 px-4',
        heading: 'Custom Section Heading',
        subheading: 'This is a fully customizable block.',
        bodyHtml: '<p>You can write <strong>any HTML</strong> here.</p><ul><li>Dynamic colors</li><li>Padding control</li><li>Full freedom</li></ul>',
        textAlign: 'center',
    }
};

export default function LeftPanel() {
    const { sections, setSections, pageId, setSelectedSectionId } = useEditor();

    const handleAddSection = async (type: string) => {
        const newOrder = sections.length > 0 ? Math.max(...sections.map(s => s.order)) + 1 : 1;
        const content = DEFAULT_CONTENT[type] || {};

        try {
            const res = await fetch('/api/sections', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pageId, type, order: newOrder, content }),
            });
            const newSection = await res.json();
            setSections([...sections, newSection]);
            setSelectedSectionId(newSection.id);
        } catch (e) {
            console.error('Failed to add section', e);
        }
    };

    return (
        <div className="w-72 bg-white border-r flex flex-col h-full shrink-0 shadow-[4px_0_24px_-10px_rgba(0,0,0,0.1)] z-10">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <h2 className="font-bold text-gray-800 text-lg">Components</h2>
                <p className="text-xs text-gray-500 mt-1">Drag or click to add to page</p>
            </div>
            <div className="p-4 flex flex-col gap-2 overflow-y-auto">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 mt-2 px-2">Available Blocks</div>
                {AVAILABLE_COMPONENTS.map((comp) => (
                    <button
                        key={comp.type}
                        onClick={() => handleAddSection(comp.type)}
                        className="group flex items-center justify-between p-3.5 bg-white border border-gray-100 rounded-xl hover:border-blue-500 hover:shadow-md hover:shadow-blue-500/10 transition-all duration-200 text-left"
                    >
                        <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700 transition-colors">
                            {comp.label}
                        </span>
                        <div className="bg-gray-50 p-1.5 rounded-lg group-hover:bg-blue-50 transition-colors">
                            <PlusCircle size={16} className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
