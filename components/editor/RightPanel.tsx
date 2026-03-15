'use client';

import React, { useState, useEffect } from 'react';
import { useEditor } from './EditorProvider';

export default function RightPanel() {
    const { sections, selectedSectionId, setSections } = useEditor();
    const selectedSection = sections.find((s) => s.id === selectedSectionId);

    const [localContent, setLocalContent] = useState<Record<string, any>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [rawMode, setRawMode] = useState(false);
    const [rawText, setRawText] = useState('');

    useEffect(() => {
        if (selectedSection) {
            setLocalContent(selectedSection.content);
            setRawText(JSON.stringify(selectedSection.content, null, 2));
        } else {
            setLocalContent({});
            setRawText('');
        }
    }, [selectedSectionId, selectedSection?.content]);

    if (!selectedSection) {
        return (
            <div className="w-[450px] bg-white border-l h-full flex items-center justify-center p-6 text-center text-sm text-gray-400 shrink-0">
                Select a section on the canvas to edit its properties.
            </div>
        );
    }

    const handleSave = async () => {
        try {
            setIsSaving(true);
            const parsedContent = rawMode ? JSON.parse(rawText) : localContent;

            await fetch(`/api/sections/${selectedSection.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: parsedContent }),
            });

            setSections((prev) =>
                prev.map((s) => (s.id === selectedSection.id ? { ...s, content: parsedContent } : s))
            );
        } catch (e) {
            alert('Invalid JSON! Please check your syntax.');
            console.error(e);
        } finally {
            setIsSaving(false);
        }
    };

    const handleFieldChange = (path: string[], value: any) => {
        setLocalContent((prev) => {
            const next = { ...prev };
            let current = next;
            for (let i = 0; i < path.length - 1; i++) {
                current[path[i]] = Array.isArray(current[path[i]]) ? [...current[path[i]]] : { ...current[path[i]] };
                current = current[path[i]];
            }
            current[path[path.length - 1]] = value;
            return next;
        });
    };

    const renderField = (key: string, value: any, path: string[]) => {
        if (typeof value === 'string') {
            const isLongText = key.toLowerCase().includes('description') || key.toLowerCase().includes('quote') || value.length > 50 || key.toLowerCase().includes('html');
            return (
                <div key={path.join('.')} className="mb-2 group">
                    <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider group-focus-within:text-blue-500 transition-colors">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    {isLongText ? (
                        <textarea
                            className="w-full text-sm border border-gray-200 bg-white p-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm resize-y min-h-[100px]"
                            value={value}
                            onChange={(e) => handleFieldChange(path, e.target.value)}
                        />
                    ) : (
                        <input
                            type="text"
                            className="w-full text-sm border border-gray-200 bg-white p-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                            value={value}
                            onChange={(e) => handleFieldChange(path, e.target.value)}
                        />
                    )}
                </div>
            );
        }

        if (typeof value === 'number') {
            return (
                <div key={path.join('.')} className="mb-2 group">
                    <label className="block text-[11px] font-bold text-gray-400 mb-1.5 uppercase tracking-wider group-focus-within:text-blue-500 transition-colors">{key}</label>
                    <input
                        type="number"
                        className="w-full text-sm border border-gray-200 bg-white p-3 rounded-xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all shadow-sm"
                        value={value}
                        onChange={(e) => handleFieldChange(path, parseFloat(e.target.value))}
                    />
                </div>
            );
        }

        if (Array.isArray(value)) {
            return (
                <div key={path.join('.')} className="mb-2 p-5 border border-gray-200/60 rounded-2xl bg-white shadow-sm hover:border-gray-300 transition-colors">
                    <label className="block text-sm font-extrabold text-gray-900 mb-4 capitalize flex items-center gap-2">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                        <span className="text-[10px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-bold uppercase tracking-widest">List</span>
                    </label>
                    {value.map((item, index) => (
                        <div key={index} className="pl-4 border-l-2 border-slate-200 mb-6 pb-2 last:mb-0 last:pb-0 relative">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-100 border-2 border-white shadow-sm flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            </div>
                            <div className="text-[11px] font-bold text-slate-400 mb-3 uppercase tracking-wider">Item {index + 1}</div>
                            <div className="flex flex-col gap-3">
                                {Object.entries(item).map(([k, v]) => renderField(k, v, [...path, index.toString(), k]))}
                            </div>
                        </div>
                    ))}
                    <div className="text-[11px] text-indigo-600 font-semibold mt-4 bg-indigo-50/50 p-3 rounded-xl border border-indigo-100/50 flex items-center gap-2">
                        <svg className="w-4 h-4 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Switch to Raw Content to add or remove items.
                    </div>
                </div>
            );
        }

        if (typeof value === 'object' && value !== null) {
            return (
                <div key={path.join('.')} className="mb-2 p-5 border border-gray-100 rounded-2xl bg-slate-50 shadow-sm">
                    <label className="block text-sm font-extrabold text-gray-900 mb-4 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                    </label>
                    <div className="flex flex-col gap-3">
                        {Object.entries(value).map(([k, v]) => renderField(k, v, [...path, k]))}
                    </div>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="w-[450px] bg-white border-l h-full flex flex-col shrink-0 shadow-[-8px_0_30px_-15px_rgba(0,0,0,0.1)] relative z-20">
            <div className="p-6 border-b border-gray-100 bg-white z-10 sticky top-0">
                <div className="flex justify-between items-start mb-1">
                    <div className="flex flex-col">
                        <span className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">Editing</span>
                        <h2 className="capitalize text-xl font-extrabold text-gray-900">{selectedSection.type.replace(/_/g, ' ')}</h2>
                    </div>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <span className="text-xs font-medium text-gray-400 bg-gray-100 px-2.5 py-1 rounded-md">ID: {selectedSection.id}</span>
                    <button
                        onClick={() => {
                            if (rawMode) {
                                try {
                                    const parsed = JSON.parse(rawText);
                                    setLocalContent(parsed);
                                    setRawMode(false);
                                } catch (e) {
                                    alert('Invalid JSON! Please fix syntax before switching back to UI Mode.');
                                }
                            } else {
                                setRawText(JSON.stringify(localContent, null, 2));
                                setRawMode(true);
                            }
                        }}
                        className={`text-xs px-3 py-1.5 rounded-lg font-semibold transition-all duration-200 ${rawMode ? 'bg-indigo-50 text-indigo-700 hover:bg-indigo-100 border border-indigo-200' : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200 shadow-sm'}`}
                    >
                        {rawMode ? 'Go to visual Form Builder' : 'Edit Raw Content'}
                    </button>
                </div>
            </div>

            <div className="flex-1 p-6 overflow-y-auto bg-gray-50/30">
                {rawMode ? (
                    <div className="h-full flex flex-col min-h-[600px] animate-in fade-in duration-200">
                        <div className="flex items-center justify-between mb-3">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Source Code (JSON)</label>
                        </div>
                        <p className="text-xs text-amber-600 mb-4 bg-amber-50 p-3 rounded-lg border border-amber-200/50">
                            <strong>Note:</strong> You must use valid JSON syntax here (double quotes around keys).
                        </p>
                        <textarea
                            value={rawText}
                            onChange={(e) => setRawText(e.target.value)}
                            className="flex-1 w-full p-5 text-[13px] leading-relaxed font-mono bg-[#0f172a] text-[#e2e8f0] rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none resize-none shadow-inner selection:bg-indigo-500/30 border border-slate-800"
                            spellCheck={false}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-6 animate-in fade-in duration-200 pb-8">
                        {Object.entries(localContent).map(([k, v]) => renderField(k, v, [k]))}
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-white z-10 sticky bottom-0 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
                <button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="w-full py-3.5 bg-blue-600 text-white font-bold rounded-xl shadow-[0_4px_14px_0_rgba(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:bg-blue-700 hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
                >
                    {isSaving ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving Changes...</span>
                        </>
                    ) : (
                        'Publish Changes'
                    )}
                </button>
                <p className="text-center text-[11px] text-gray-400 mt-3 font-medium">Changes are instantly live on the public website.</p>
            </div>
        </div>
    );
}
