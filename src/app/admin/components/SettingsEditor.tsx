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
    const [deliveryInside, setDeliveryInside] = useState(0);
    const [deliveryOutside, setDeliveryOutside] = useState(0);

    // Social Links
    const [socialInstagram, setSocialInstagram] = useState("");
    const [socialTelegram, setSocialTelegram] = useState("");
    const [socialWhatsapp, setSocialWhatsapp] = useState("");
    const [socialFacebook, setSocialFacebook] = useState("");
    const [socialTiktok, setSocialTiktok] = useState("");

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
                    if (data.delivery_inside !== undefined) setDeliveryInside(data.delivery_inside);
                    if (data.delivery_outside !== undefined) setDeliveryOutside(data.delivery_outside);
                    
                    if (data.social_links) {
                        setSocialInstagram(data.social_links.instagram || "");
                        setSocialTelegram(data.social_links.telegram || "");
                        setSocialWhatsapp(data.social_links.whatsapp || "");
                        setSocialFacebook(data.social_links.facebook || "");
                        setSocialTiktok(data.social_links.tiktok || "");
                    }
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
                    partner_url: partnerUrl,
                    delivery_inside: deliveryInside,
                    delivery_outside: deliveryOutside,
                    social_links: {
                        instagram: socialInstagram,
                        telegram: socialTelegram,
                        whatsapp: socialWhatsapp,
                        facebook: socialFacebook,
                        tiktok: socialTiktok
                    }
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
                <h2 className="text-2xl font-black text-white flex items-center gap-3">
                    <Settings className="w-7 h-7 text-amber-500" />
                    إعدادات الموقع
                </h2>
                <p className="text-zinc-400 text-sm font-medium mt-1">عدّل اسم الموقع، الوصف العام، التوصيل، وسعر الصرف.</p>
            </div>

            <div className="max-w-2xl bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-bold text-zinc-400 mb-1.5">اسم الموقع</label>
                    <input
                        type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-lg font-bold text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30"
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-zinc-400 mb-1.5">وصف الموقع</label>
                    <textarea
                        value={description} onChange={(e) => setDescription(e.target.value)} rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm text-zinc-300 focus:outline-none focus:ring-2 focus:ring-brand-light/30 resize-none"
                    />
                </div>

                <div className="pt-6 border-t border-white/5">
                    <h3 className="font-bold text-white mb-4">شعار الموقع (Logo)</h3>
                    <div className="col-span-full mb-4">
                        <label className="block text-sm font-bold text-zinc-400 mb-2 flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-brand-light" /> رفع الشعار
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="relative cursor-pointer flex-1">
                                <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-white/20 hover:border-brand-light/50 hover:bg-brand-light/5 transition-colors flex items-center justify-center gap-2">
                                    {uploadingImage ? (
                                        <>
                                            <Loader2 className="w-5 h-5 text-brand-light animate-spin" />
                                            <span className="text-sm font-bold text-brand-light">جاري الرفع...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5 text-zinc-500" />
                                            <span className="text-sm font-bold text-zinc-400">اختر صورة الشعار من جهازك</span>
                                        </>
                                    )}
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                            </label>
                            {logoUrl && (
                                <div className="w-16 h-16 rounded-xl border border-white/10 overflow-hidden bg-white/5 shrink-0 flex items-center justify-center p-1">
                                    <img src={logoUrl} alt="Logo" className="max-w-full max-h-full object-contain" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                    <h3 className="font-bold text-white mb-4">ربط بموقع شريك (مثلاً موقع الهواتف)</h3>
                    <p className="text-zinc-500 text-sm mb-4">في حال أردت وضع رابط أعلى الموقع يوجه الزبائن لموقعك الآخر.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-zinc-400 mb-1.5">اسم الموقع الآخر (أو نص الزر)</label>
                            <input
                                type="text" value={partnerName} onChange={(e) => setPartnerName(e.target.value)}
                                placeholder="مثال: قسم الهواتف"
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-400 mb-1.5">رابط الموقع الآخر</label>
                            <input
                                type="text" value={partnerUrl} onChange={(e) => setPartnerUrl(e.target.value)}
                                placeholder="https://example.com" dir="ltr"
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 text-left"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                    <h3 className="font-bold text-white mb-4">إعدادات التوصيل (بالدينار العراقي)</h3>
                    <p className="text-zinc-500 text-sm mb-4">حدد تكلفة التوصيل التي ستظهر للزبائن عند الدفع.</p>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-zinc-400 mb-1.5">داخل الناصرية</label>
                            <input
                                type="number" value={deliveryInside} onChange={(e) => setDeliveryInside(Number(e.target.value))}
                                placeholder="مثال: 5000"
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm font-bold text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light/30"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-zinc-400 mb-1.5">خارج الناصرية</label>
                            <input
                                type="number" value={deliveryOutside} onChange={(e) => setDeliveryOutside(Number(e.target.value))}
                                placeholder="مثال: 10000"
                                className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm font-bold text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light/30"
                            />
                        </div>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/5">
                    <h3 className="font-bold text-white mb-4">روابط حسابات التواصل (تظهر في الموقع)</h3>
                    <p className="text-zinc-500 text-sm mb-4">أضف رابط الحساب ليظهر في الموقع. اترك الحقل فارغاً لإخفاء الأيقونة.</p>
                    <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-1.5">Instagram (إنستقرام)</label>
                                <input
                                    type="text" value={socialInstagram} onChange={(e) => setSocialInstagram(e.target.value)}
                                    placeholder="https://instagram.com/..." dir="ltr"
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 text-left"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-1.5">Telegram (تيليجرام)</label>
                                <input
                                    type="text" value={socialTelegram} onChange={(e) => setSocialTelegram(e.target.value)}
                                    placeholder="https://t.me/..." dir="ltr"
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 text-left"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-1.5">WhatsApp (واتساب)</label>
                                <input
                                    type="text" value={socialWhatsapp} onChange={(e) => setSocialWhatsapp(e.target.value)}
                                    placeholder="https://wa.me/..." dir="ltr"
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 text-left"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-1.5">Facebook (فيسبوك)</label>
                                <input
                                    type="text" value={socialFacebook} onChange={(e) => setSocialFacebook(e.target.value)}
                                    placeholder="https://facebook.com/..." dir="ltr"
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 text-left"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-zinc-400 mb-1.5">TikTok (تيك توك)</label>
                                <input
                                    type="text" value={socialTiktok} onChange={(e) => setSocialTiktok(e.target.value)}
                                    placeholder="https://tiktok.com/@..." dir="ltr"
                                    className="w-full px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 text-left"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-4 border-t border-white/5">
                    <label className="block text-sm font-bold text-zinc-400 mb-1.5">سعر الصرف (كل 100 دولار بالدينار العراقي)</label>
                    <div className="flex items-center gap-3">
                        <input
                            type="number" value={exchangeRate} onChange={(e) => setExchangeRate(Number(e.target.value))}
                            className="w-1/3 px-4 py-3 rounded-xl border border-white/10 bg-[#000000] text-lg font-bold text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-light/30"
                        />
                        <span className="text-zinc-500 text-sm font-medium">سيعتمد هذا الرقم لحساب الأسعار بالدينار تلقائياً.</span>
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
