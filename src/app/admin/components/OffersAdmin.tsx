"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Tag, Loader2, RefreshCw } from "lucide-react";

interface Offer {
    id: string;
    title: string;
    desc_text: string;
    image_color: string;
    badge: string;
    time_left: string;
}

const colorOptions = [
    { label: "أزرق", value: "bg-blue-500" },
    { label: "كحلي", value: "bg-brand-dark" },
    { label: "أخضر", value: "bg-emerald-500" },
    { label: "أرجواني", value: "bg-purple-500" },
    { label: "أحمر", value: "bg-red-500" },
];

export default function OffersAdmin() {
    const [offers, setOffers] = useState<Offer[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    // Form state
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [badge, setBadge] = useState("عرض خاص");
    const [timeLeft, setTimeLeft] = useState("فترة محدودة");
    const [imageColor, setImageColor] = useState("bg-brand-dark");

    const fetchOffers = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/offers");
            if (res.ok) {
                const data = await res.json();
                setOffers(data);
            }
        } catch (error) {
            console.error("Failed to fetch offers:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOffers();
    }, []);

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/offers", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    title,
                    desc_text: desc,
                    badge,
                    time_left: timeLeft,
                    image_color: imageColor
                }),
            });
            if (res.ok) {
                // Reset form
                setTitle("");
                setDesc("");
                setBadge("عرض خاص");
                setTimeLeft("فترة محدودة");
                setImageColor("bg-brand-dark");

                await fetchOffers(); // Refresh list
            }
        } catch (error) {
            console.error("Failed to add offer:", error);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("هل أنت متأكد من حذف هذا العرض؟")) return;

        try {
            await fetch(`/api/offers?id=${id}`, { method: "DELETE" });
            fetchOffers(); // Refresh list
        } catch (error) {
            console.error("Failed to delete offer:", error);
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
        <div className="space-y-8">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                        <Tag className="w-7 h-7 text-red-500" />
                        إدارة العروض الخاصة
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                        أضف واحذف العروض التي ستظهر في الصفحة الرئيسية (قسم العروض الذكية).
                    </p>
                </div>
                <button
                    onClick={fetchOffers}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 transition-colors text-sm font-bold"
                >
                    <RefreshCw className="w-4 h-4" /> تحديث
                </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 items-start">

                {/* Form to Add New */}
                <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm sticky top-8">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2 text-slate-900">
                        <Plus className="w-5 h-5 text-emerald-600" />
                        إضافة عرض جديد
                    </h3>
                    <form onSubmit={handleAdd} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">عنوان العرض</label>
                            <input
                                required type="text" value={title} onChange={e => setTitle(e.target.value)}
                                placeholder="مثال: عرض العودة للمدارس"
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-dark/20"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-1">وصف موجز</label>
                            <textarea
                                required value={desc} onChange={e => setDesc(e.target.value)}
                                placeholder="مثال: خصم 15% على جميع اللابتوبات..." rows={3}
                                className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-dark/20 resize-none"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">نص التمييز (شريط أحمر)</label>
                                <input
                                    required type="text" value={badge} onChange={e => setBadge(e.target.value)}
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-dark/20"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-1">الوقت المتبقي</label>
                                <input
                                    required type="text" value={timeLeft} onChange={e => setTimeLeft(e.target.value)}
                                    placeholder="مثال: يومان"
                                    className="w-full px-4 py-2 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-brand-dark/20"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-600 mb-2">لون خلفية الصورة الديكورية</label>
                            <div className="flex flex-wrap gap-2">
                                {colorOptions.map(opt => (
                                    <button
                                        key={opt.value}
                                        type="button"
                                        onClick={() => setImageColor(opt.value)}
                                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 border transition-all ${imageColor === opt.value ? 'border-slate-800 ring-2 ring-slate-800/20' : 'border-slate-200 hover:border-slate-400'}`}
                                    >
                                        <div className={`w-3 h-3 rounded-full ${opt.value}`} />
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <button
                            disabled={saving} type="submit"
                            className="w-full mt-2 py-3 rounded-xl bg-brand-dark text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                            أضف العرض
                        </button>
                    </form>
                </div>

                {/* List of Current Offers */}
                <div className="lg:col-span-2 space-y-4">
                    {offers.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-slate-300">
                            <Tag className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-slate-500 font-bold mb-1">لا توجد عروض حالياً</h3>
                            <p className="text-slate-400 text-sm">أضف عرضك الأول من القائمة الجانبية.</p>
                        </div>
                    ) : (
                        offers.map((offer) => (
                            <div key={offer.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-5">
                                <div className={`w-20 h-20 shrink-0 rounded-xl ${offer.image_color} relative overflow-hidden flex items-center justify-center`}>
                                    <Tag className="w-8 h-8 text-white/50 absolute rotate-12" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded border border-red-100">{offer.badge}</span>
                                        <span className="text-slate-400 text-[10px] font-bold bg-slate-100 px-2 py-0.5 rounded">ينتهي: {offer.time_left}</span>
                                    </div>
                                    <h4 className="font-bold text-slate-900 text-lg mb-1">{offer.title}</h4>
                                    <p className="text-slate-500 text-sm line-clamp-1">{offer.desc_text}</p>
                                </div>
                                <button
                                    onClick={() => handleDelete(offer.id)}
                                    className="w-10 h-10 shrink-0 rounded-xl bg-red-50 text-red-600 flex items-center justify-center hover:bg-red-100 transition-colors"
                                    title="حذف العرض"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

            </div>
        </div>
    );
}
