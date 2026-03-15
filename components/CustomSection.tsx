import React from 'react';

/**
 * A highly customizable section that allows the admin to define any layout
 * using standard CSS properties, typography options, and flexible text blocks.
 */
interface CustomSectionProps {
    componentId?: string;
    backgroundColor?: string;
    textColor?: string;
    padding?: string;
    heading?: string;
    subheading?: string;
    bodyHtml?: string;
    textAlign?: 'left' | 'center' | 'right';
    _sectionId?: number;
}

export default function CustomSection({
    backgroundColor = '#ffffff',
    textColor = '#111827',
    padding = 'py-16 px-4',
    heading,
    subheading,
    bodyHtml,
    textAlign = 'left',
}: CustomSectionProps) {
    return (
        <section
            style={{ backgroundColor, color: textColor }}
            className={`w-full ${padding}`}
        >
            <div className="max-w-7xl mx-auto" style={{ textAlign }}>
                {heading && (
                    <h2 className="text-3xl font-bold mb-4">{heading}</h2>
                )}

                {subheading && (
                    <h3 className="text-xl font-medium opacity-80 mb-6">{subheading}</h3>
                )}

                {bodyHtml && (
                    <div
                        className="prose prose-lg max-w-none opacity-90"
                        style={{ color: 'inherit' }}
                        dangerouslySetInnerHTML={{ __html: bodyHtml }}
                    />
                )}
            </div>
        </section>
    );
}
