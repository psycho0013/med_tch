"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Type } from "lucide-react";

export default function HeroEditor() {
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [ctaText, setCtaText] = useState("");
    const [badgeTitle, setBadgeTitle] = useState("أفضل سعر");
    const [badgeText, setBadgeText] = useState("-15% خصم");
    const [badgeVisible, setBadgeVisible] = useState(true);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/hero")
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) {
                    setTitle(data.title || "");
                    setSubtitle(data.subtitle || "");
                    setCtaText(data.cta_text || "");
                    if (data.badge_title !== undefined) setBadgeTitle(data.badge_title);
                    if (data.badge_text !== undefined) setBadgeText(data.badge_text);
                    if (data.badge_visible !== undefined) setBadgeVisible(data.badge_visible);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        try {
            await fetch("/api/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    subtitle,
                    cta_text: ctaText,
                    badge_title: badgeTitle,
                    badge_text: badgeText,
                    badge_visible: badgeVisible
                }),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-brand-dark animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                    <Type className="w-7 h-7 text-cyan-600" />
                    تعديل قسم الهيرو
                </h2>
                <p className="text-slate-500 text-sm font-medium mt-1">عدّل العنوان الرئيسي والوصف وزر الدعوة للعمل.</p>
            </div>

            <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1.5">العنوان الرئيسي</label>
                    <input
                        type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-lg font-black text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1.5">الوصف الفرعي</label>
                    <textarea
                        value={subtitle} onChange={(e) => setSubtitle(e.target.value)} rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 resize-none"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1.5">نص الزر الرئيسي (CTA)</label>
                    <input
                        type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                    />
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        المربع العائم (العرض الذكي)
                        <label className="relative inline-flex items-center cursor-pointer mr-auto text-sm">
                            <input
                                type="checkbox" className="sr-only peer"
                                checked={badgeVisible} onChange={(e) => setBadgeVisible(e.target.checked)}
                            />
                            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                            <span className="mr-3 font-medium text-slate-600">{badgeVisible ? 'مفعل' : 'معطل'}</span>
                        </label>
                    </h3>

                    <div className={`grid md:grid-cols-2 gap-4 transition-opacity ${!badgeVisible ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1.5">عنوان الشريط</label>
                            <input
                                type="text" value={badgeTitle} onChange={(e) => setBadgeTitle(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1.5">نص العرض</label>
                            <input
                                type="text" value={badgeText} onChange={(e) => setBadgeText(e.target.value)}
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
                    <button
                        onClick={handleSave} disabled={saving}
                        className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-dark text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 shadow-md"
                    >
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        حفظ التغييرات
                    </button>
                    {saved && <span className="text-emerald-600 font-bold text-sm">✓ تم الحفظ بنجاح</span>}
                </div>
            </div>
        </div>
    );
}
