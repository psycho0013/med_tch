"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Settings } from "lucide-react";

export default function SettingsEditor() {
    const [siteName, setSiteName] = useState("");
    const [description, setDescription] = useState("");
    const [exchangeRate, setExchangeRate] = useState(1500);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) {
                    setSiteName(data.site_name || "");
                    setDescription(data.description || "");
                    if (data.exchange_rate) setExchangeRate(data.exchange_rate);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        try {
            await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ site_name: siteName, description, exchange_rate: exchangeRate }),
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
                    <Settings className="w-7 h-7 text-amber-600" />
                    إعدادات الموقع
                </h2>
                <p className="text-slate-500 text-sm font-medium mt-1">عدّل اسم الموقع، الوصف العام، وسعر الصرف.</p>
            </div>

            <div className="max-w-2xl bg-white rounded-2xl border border-slate-200 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1.5">اسم الموقع</label>
                    <input
                        type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-lg font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-slate-600 mb-1.5">وصف الموقع</label>
                    <textarea
                        value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 resize-none"
                    />
                </div>

                <div className="pt-4 border-t border-slate-100">
                    <label className="block text-sm font-bold text-slate-600 mb-1.5">سعر الصرف (كل 100 دولار بالدينار العراقي)</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="number" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))}
                            className="w-1/3 px-4 py-3 rounded-xl border border-slate-200 text-lg font-bold text-brand-dark focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                        />
                        <span className="text-slate-500 text-sm font-medium">سيعتمد هذا الرقم لحساب الأسعار بالدينار تلقائياً.</span>
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
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
