'use client';

import React from 'react';
import { useEditor } from './EditorProvider';
import { 
    LayoutTemplate, 
    ImagePlay, 
    Info, 
    ShieldCheck, 
    User, 
    Users,
    Settings, 
    MessageSquareQuote, 
    Mail, 
    Code2,
    Plus
} from 'lucide-react';

const AVAILABLE_COMPONENTS = [
    { type: 'navbar', label: 'Navigation Bar', icon: LayoutTemplate },
    { type: 'hero', label: 'Hero Section', icon: ImagePlay },
    { type: 'about', label: 'About Us', icon: Info },
    { type: 'why_choose_us', label: 'Why Choose Us', icon: ShieldCheck },
    { type: 'founder', label: 'Founder Message', icon: User },
    { type: 'team', label: 'Our Team', icon: Users },
    { type: 'how_it_works', label: 'How It Works', icon: Settings },
    { type: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
    { type: 'contact', label: 'Contact', icon: Mail },
    { type: 'custom', label: 'Custom Section', icon: Code2 },
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
    team: {
        sectionLabel: 'OUR TEAM',
        heading: 'Meet the Team Behind ColabQtrix',
        subheading: 'A multidisciplinary team building reliable digital products and consultancy outcomes.',
        members: [
            {
                id: 'member_1',
                name: 'Team Member',
                role: 'Role',
                bio: 'Short introduction about this team member.',
                image: { src: '/images/founder.jpg', alt: 'Team Member' }
            }
        ]
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
        heading: 'Connect with us',
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
        <div className="w-[280px] bg-[#0f1115] border-r border-[#1f2229] flex flex-col h-full shrink-0 z-10">
            
            {/* Header */}
            <div className="px-5 py-4 border-b border-[#1f2229] bg-[#0a0b0d]">
                <h2 className="font-semibold text-gray-200 text-sm tracking-wide">Add Elements</h2>
                <p className="text-[11px] text-gray-500 mt-1 font-medium">Click to append to your canvas</p>
            </div>

            {/* Component List */}
            <div className="p-3 flex flex-col gap-1 overflow-y-auto custom-scrollbar">
                
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-2 mb-2 px-2">
                    Sections Library
                </div>
                
                <div className="grid grid-cols-2 gap-2 mt-1">
                    {AVAILABLE_COMPONENTS.map((comp) => {
                        const Icon = comp.icon;
                        return (
                            <button
                                key={comp.type}
                                onClick={() => handleAddSection(comp.type)}
                                className="group relative flex flex-col items-center justify-center gap-2 p-4 bg-[#14161b] border border-[#232730] rounded-xl hover:bg-[#1c1f26] hover:border-[#3b82f6]/50 transition-all duration-200"
                            >
                                <Icon size={20} className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                                <span className="text-[10px] font-medium text-gray-300 group-hover:text-white transition-colors text-center leading-tight">
                                    {comp.label}
                                </span>
                                
                                {/* Hover Add Icon */}
                                <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Plus size={12} className="text-blue-400" />
                                </div>
                            </button>
                        );
                    })}
                </div>

            </div>
        </div>
    );
}
