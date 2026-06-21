"use client";

import { useState, useEffect } from "react";
import { Save, Loader2, Type, Upload, Image as ImageIcon, Plus, Trash2, Edit } from "lucide-react";
import type { HeroContent } from "@/lib/types";

const defaultBanner: Partial<HeroContent> = {
    title: "إعلان جديد",
    subtitle: "وصف الإعلان الجديد",
    cta_text: "اضغط هنا",
    badge_title: "جديد",
    badge_text: "",
    badge_visible: true,
    cta_link: "/compare",
    secondary_cta_text: "",
    secondary_cta_link: "",
    hero_image_url: "",
    hero_icon: "Smartphone"
};

export default function HeroEditor() {
    const [banners, setBanners] = useState<HeroContent[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    // Form states
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [ctaText, setCtaText] = useState("");
    const [badgeTitle, setBadgeTitle] = useState("");
    const [badgeText, setBadgeText] = useState("");
    const [badgeVisible, setBadgeVisible] = useState(true);
    const [ctaLink, setCtaLink] = useState("");
    const [secondaryCtaText, setSecondaryCtaText] = useState("");
    const [secondaryCtaLink, setSecondaryCtaLink] = useState("");
    const [heroImageUrl, setHeroImageUrl] = useState("");
    const [heroIcon, setHeroIcon] = useState("");

    const fetchBanners = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/hero");
            const data = await res.json();
            if (data && !data.error && Array.isArray(data)) {
                setBanners(data);
                if (data.length > 0 && selectedId === null) {
                    selectBanner(data[0]);
                } else if (selectedId !== null) {
                    const found = data.find((b: HeroContent) => b.id === selectedId);
                    if (found) selectBanner(found);
                    else if (data.length > 0) selectBanner(data[0]);
                }
            }
        } catch (err) {
            console.error("Failed to fetch banners:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBanners();
    }, []);

    const selectBanner = (banner: HeroContent) => {
        setSelectedId(banner.id);
        setTitle(banner.title || "");
        setSubtitle(banner.subtitle || "");
        setCtaText(banner.cta_text || "");
        setBadgeTitle(banner.badge_title || "");
        setBadgeText(banner.badge_text || "");
        setBadgeVisible(banner.badge_visible !== undefined ? banner.badge_visible : true);
        setCtaLink(banner.cta_link || "");
        setSecondaryCtaText(banner.secondary_cta_text || "");
        setSecondaryCtaLink(banner.secondary_cta_link || "");
        setHeroImageUrl(banner.hero_image_url || "");
        setHeroIcon(banner.hero_icon || "");
    };

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
                setHeroImageUrl(data.url);
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
        if (!selectedId) return;
        setSaving(true);
        setSaved(false);
        try {
            await fetch("/api/hero", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    id: selectedId,
                    title,
                    subtitle,
                    cta_text: ctaText,
                    badge_title: badgeTitle,
                    badge_text: badgeText,
                    badge_visible: badgeVisible,
                    cta_link: ctaLink,
                    secondary_cta_text: secondaryCtaText,
                    secondary_cta_link: secondaryCtaLink,
                    hero_image_url: heroImageUrl,
                    hero_icon: heroIcon
                }),
            });
            setSaved(true);
            setTimeout(() => setSaved(false), 3000);
            fetchBanners(); // Refresh list to get updated titles
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    const handleAddBanner = async () => {
        if (!confirm("هل أنت متأكد من إضافة إعلان جديد؟")) return;
        setLoading(true);
        try {
            const res = await fetch("/api/hero", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(defaultBanner),
            });
            const newBanner = await res.json();
            if (!newBanner.error) {
                setBanners([...banners, newBanner]);
                selectBanner(newBanner);
            }
        } catch (err) {
            console.error("Add failed:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteBanner = async (id: number) => {
        if (!confirm("هل أنت متأكد من حذف هذا الإعلان نهائياً؟")) return;
        setLoading(true);
        try {
            await fetch(`/api/hero?id=${id}`, { method: "DELETE" });
            const remaining = banners.filter(b => b.id !== id);
            setBanners(remaining);
            if (selectedId === id) {
                if (remaining.length > 0) selectBanner(remaining[0]);
                else setSelectedId(null);
            }
        } catch (err) {
            console.error("Delete failed:", err);
        } finally {
            setLoading(false);
        }
    };

    if (loading && banners.length === 0) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-brand-dark animate-spin" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <Type className="w-7 h-7 text-cyan-600" />
                        إدارة البانر الإعلاني (الهيرو)
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">أضف، عدل، أو احذف الإعلانات التي تظهر في الواجهة الرئيسية بشكل متتابع.</p>
                </div>
                <button
                    onClick={handleAddBanner}
                    className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold text-sm hover:bg-emerald-700 transition-colors shadow-sm"
                >
                    <Plus className="w-4 h-4" /> إعلان جديد
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Banners List Sidebar */}
                <div className="w-full lg:w-1/3 flex flex-col gap-3">
                    <h3 className="font-bold text-slate-800 px-1 mb-1">الإعلانات الحالية ({banners.length})</h3>
                    {banners.length === 0 ? (
                        <div className="bg-slate-50 border border-slate-200 border-dashed rounded-2xl p-8 text-center">
                            <p className="text-slate-500 text-sm font-medium">لا توجد إعلانات حالياً.</p>
                        </div>
                    ) : (
                        banners.map((b, idx) => (
                            <div 
                                key={b.id} 
                                className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${selectedId === b.id ? 'bg-white border-brand-dark shadow-md ring-1 ring-brand-dark/20' : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-white'}`}
                                onClick={() => selectBanner(b)}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                                        {b.hero_image_url ? (
                                            <img src={b.hero_image_url} alt="thumb" className="w-full h-full object-cover" />
                                        ) : (
                                            <ImageIcon className="w-4 h-4 text-slate-400" />
                                        )}
                                    </div>
                                    <div className="truncate">
                                        <div className="font-bold text-slate-800 text-sm truncate">{b.title || "بدون عنوان"}</div>
                                        <div className="text-xs text-slate-500">إعلان #{idx + 1}</div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1">
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteBanner(b.id); }}
                                        className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                        title="حذف الإعلان"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Editor Form */}
                {selectedId !== null && (
                    <div className="w-full lg:w-2/3 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                            <Edit className="w-5 h-5 text-slate-400" />
                            <h3 className="font-black text-slate-800 text-lg">تعديل تفاصيل الإعلان</h3>
                        </div>
                        
                        <div className="space-y-6">
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
                            <div className="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1.5">نص الزر الرئيسي (CTA)</label>
                                    <input
                                        type="text" value={ctaText} onChange={(e) => setCtaText(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1.5">رابط الزر الرئيسي</label>
                                    <select
                                        value={ctaLink} onChange={(e) => setCtaLink(e.target.value)}
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 text-left bg-white"
                                    >
                                        <option value="/#pc">قسم تجميعات PC (بالرئيسية)</option>
                                        <option value="/category/pcs">صفحة تجميعات PC</option>
                                        <option value="/#monitors">قسم الشاشات (بالرئيسية)</option>
                                        <option value="/category/monitors">صفحة الشاشات</option>
                                        <option value="/#accessories">قسم الإكسسوارات (بالرئيسية)</option>
                                        <option value="/category/accessories">صفحة الإكسسوارات</option>
                                        <option value="/category/parts">صفحة القطع</option>
                                        <option value="/compare">صفحة المقارنة الذكية</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1.5">نص الزر الثانوي</label>
                                    <input
                                        type="text" value={secondaryCtaText} onChange={(e) => setSecondaryCtaText(e.target.value)}
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-600 mb-1.5">رابط الزر الثانوي</label>
                                    <select
                                        value={secondaryCtaLink} onChange={(e) => setSecondaryCtaLink(e.target.value)}
                                        dir="ltr"
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 text-left bg-white"
                                    >
                                        <option value="">بدون زر ثانوي</option>
                                        <option value="/#pc">قسم تجميعات PC (بالرئيسية)</option>
                                        <option value="/category/pcs">صفحة تجميعات PC</option>
                                        <option value="/#monitors">قسم الشاشات (بالرئيسية)</option>
                                        <option value="/category/monitors">صفحة الشاشات</option>
                                        <option value="/#accessories">قسم الإكسسوارات (بالرئيسية)</option>
                                        <option value="/category/accessories">صفحة الإكسسوارات</option>
                                        <option value="/category/parts">صفحة القطع</option>
                                        <option value="/compare">صفحة المقارنة الذكية</option>
                                    </select>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-100">
                                <h3 className="font-bold text-slate-800 mb-4">صورة الإعلان</h3>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="col-span-full mb-4 pb-4">
                                        <label className="block text-sm font-bold text-slate-600 mb-2 flex items-center gap-1.5">
                                            <ImageIcon className="w-4 h-4 text-blue-500" /> ارفع صورة بدقة عالية
                                        </label>
                                        <div className="flex flex-col sm:flex-row items-center gap-4">
                                            <label className="relative cursor-pointer w-full sm:w-auto flex-1">
                                                <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-slate-300 hover:border-brand-dark hover:bg-brand-dark/5 transition-colors flex items-center justify-center gap-2">
                                                    {uploadingImage ? (
                                                        <>
                                                            <Loader2 className="w-5 h-5 text-brand-dark animate-spin" />
                                                            <span className="text-sm font-bold text-brand-dark">جاري الرفع...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Upload className="w-5 h-5 text-slate-500" />
                                                            <span className="text-sm font-bold text-slate-600">اختر صورة</span>
                                                        </>
                                                    )}
                                                </div>
                                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                                            </label>
                                            {heroImageUrl && (
                                                <div className="w-24 h-24 rounded-xl border border-slate-200 overflow-hidden bg-black shrink-0 relative group">
                                                    <img src={heroImageUrl} alt="Preview" className="w-full h-full object-contain" />
                                                    <button 
                                                        onClick={() => setHeroImageUrl("")}
                                                        className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
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
                                        <label className="block text-sm font-bold text-slate-600 mb-1.5">الوسم العلوي (Top Label)</label>
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

                            <div className="flex items-center gap-4 pt-6 mt-2 border-t border-slate-100">
                                <button
                                    onClick={handleSave} disabled={saving}
                                    className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-dark text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 shadow-md w-full md:w-auto justify-center"
                                >
                                    {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                    حفظ التعديلات
                                </button>
                                {saved && <span className="text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-lg">✓ تم الحفظ بنجاح</span>}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
