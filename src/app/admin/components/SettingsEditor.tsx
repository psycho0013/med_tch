"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Settings, Upload, Image as ImageIcon } from "lucide-react";

export default function SettingsEditor() {
    const [siteName, setSiteName] = useState("");
    const [description, setDescription] = useState("");
    const [exchangeRate, setExchangeRate] = useState(1500);
    const [logoUrl, setLogoUrl] = useState("");
    const [partnerName, setPartnerName] = useState("");
    const [partnerUrl, setPartnerUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && !data.error) {
                    setSiteName(data.site_name || "");
                    setDescription(data.description || "");
                    if (data.exchange_rate) setExchangeRate(data.exchange_rate);
                    if (data.logo_url) setLogoUrl(data.logo_url);
                    if (data.partner_name) setPartnerName(data.partner_name);
                    if (data.partner_url) setPartnerUrl(data.partner_url);
                }
            })
            .finally(() => setLoading(false));
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            const formData = new FormData();
            formData.append("file", file);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok && data.url) {
                setLogoUrl(data.url);
            } else {
                alert("فشل رفع الصورة: " + (data.error || "خطأ غير معروف"));
            }
        } catch (error) {
            console.error("Error uploading image:", error);
            alert("حدث خطأ أثناء رفع الصورة.");
        } finally {
            setUploadingImage(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        setSaved(false);
        try {
            await fetch("/api/settings", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    site_name: siteName, 
                    description, 
                    exchange_rate: exchangeRate, 
                    logo_url: logoUrl,
                    partner_name: partnerName,
                    partner_url: partnerUrl
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

                <div className="pt-6 border-t border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4">شعار الموقع (Logo)</h3>
                    <div className="col-span-full mb-4">
                        <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-brand-dark" /> رفع الشعار
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="relative cursor-pointer flex-1">
                                <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-brand-dark hover:bg-brand-dark/5 transition-colors flex items-center justify-center gap-2">
                                    {uploadingImage ? (
                                        <>
                                            <Loader2 className="w-5 h-5 text-brand-dark animate-spin" />
                                            <span className="text-sm font-bold text-brand-dark">جاري الرفع...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5 text-slate-500" />
                                            <span className="text-sm font-bold text-slate-600">اختر صورة الشعار من جهازك</span>
                                        </>
                                    )}
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                            </label>
                            {logoUrl && (
                                <div className="w-16 h-16 rounded-xl border border-slate-200 overflow-hidden bg-slate-50 shrink-0 flex items-center justify-center p-1">
                                    <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-slate-100">
                    <h3 className="font-bold text-slate-800 mb-4">ربط بموقع شريك (مثلاً موقع الهواتف)</h3>
                    <p className="text-slate-500 text-sm mb-4">في حال أردت وضع رابط أعلى الموقع يوجه الزبائن لموقعك الآخر.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1.5">اسم الموقع الآخر (أو نص الزر)</label>
                            <input
                                type="text" value={partnerName} onChange={(e) => setPartnerName(e.target.value)}
                                placeholder="مثال: قسم الهواتف"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-600 mb-1.5">رابط الموقع الآخر</label>
                            <input
                                type="text" value={partnerUrl} onChange={(e) => setPartnerUrl(e.target.value)}
                                placeholder="https://example.com" dir="ltr"
                                className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 text-left"
                            />
                        </div>
                    </div>
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
