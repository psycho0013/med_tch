"use client";

import { useState } from "react";
import { ArrowRight, Plus, Trash2, Save, Loader2 } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/types";

interface Props {
    category: ProductCategory;
    existingProduct: Product | null;
    onSuccess: () => void;
    onCancel: () => void;
}

export default function ProductForm({ category, existingProduct, onSuccess, onCancel }: Props) {
    const isEdit = !!existingProduct;

    const [name, setName] = useState(existingProduct?.name || "");
    const [brand, setBrand] = useState(existingProduct?.brand || "");
    const [priceUSD, setPriceUSD] = useState(existingProduct?.price_usd || 0);
    const [priceIQD, setPriceIQD] = useState(existingProduct?.price_iqd || 0);
    const [rating, setRating] = useState(existingProduct?.rating || 0);
    const [tag, setTag] = useState(existingProduct?.tag || "");
    const [bgColor, setBgColor] = useState(existingProduct?.bg_color || "bg-gradient-to-br from-slate-100 to-slate-50");
    const [type, setType] = useState(existingProduct?.type || "");
    const [imageUrl, setImageUrl] = useState(existingProduct?.image_url || "");
    const [isOffer, setIsOffer] = useState(existingProduct?.is_offer || false);
    const [offerDiscount, setOfferDiscount] = useState(existingProduct?.offer_discount || "");
    const [features, setFeatures] = useState<string[]>(existingProduct?.features || ["", "", ""]);
    const [specs, setSpecs] = useState<{ key: string; value: string }[]>(
        existingProduct?.full_specs
            ? Object.entries(existingProduct.full_specs).map(([key, value]) => ({ key, value }))
            : [{ key: "", value: "" }]
    );
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const fullSpecs: Record<string, string> = {};
        specs.forEach((s) => {
            if (s.key.trim()) fullSpecs[s.key.trim()] = s.value.trim();
        });

        const payload: any = {
            category,
            name,
            brand,
            price_usd: priceUSD,
            price_iqd: priceIQD,
            rating,
            tag,
            bg_color: bgColor,
            type: type || null,
            image_url: imageUrl || null,
            is_offer: isOffer,
            offer_discount: offerDiscount || null,
            features: features.filter((f) => f.trim()),
            full_specs: fullSpecs,
        };

        if (isEdit) {
            payload.id = existingProduct.id;
        }

        try {
            await fetch("/api/products", {
                method: isEdit ? "PUT" : "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
            onSuccess();
        } catch (err) {
            console.error("Save failed:", err);
        } finally {
            setSaving(false);
        }
    };

    // ---- Feature Helpers ----
    const updateFeature = (i: number, val: string) => {
        const copy = [...features];
        copy[i] = val;
        setFeatures(copy);
    };
    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (i: number) => setFeatures(features.filter((_, idx) => idx !== i));

    // ---- Spec Helpers ----
    const updateSpec = (i: number, field: "key" | "value", val: string) => {
        const copy = [...specs];
        copy[i][field] = val;
        setSpecs(copy);
    };
    const addSpec = () => setSpecs([...specs, { key: "", value: "" }]);
    const removeSpec = (i: number) => setSpecs(specs.filter((_, idx) => idx !== i));

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onCancel} className="p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100">
                    <ArrowRight className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-black text-slate-900">
                    {isEdit ? `تعديل: ${existingProduct.name}` : "إضافة منتج جديد"}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-3xl">
                {/* Basic Info */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-5">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">المعلومات الأساسية</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="اسم المنتج" value={name} onChange={setName} required />
                        <Field label="العلامة التجارية" value={brand} onChange={setBrand} required />
                        <Field label="السعر (USD)" value={priceUSD} onChange={(v) => setPriceUSD(Number(v))} type="number" required />
                        <Field label="السعر (IQD)" value={priceIQD} onChange={(v) => setPriceIQD(Number(v))} type="number" required />
                        <Field label="التقييم (من 5)" value={rating} onChange={(v) => setRating(Number(v))} type="number" step="0.1" />
                        <Field label="الوسم المميز" value={tag} onChange={setTag} placeholder="مثال: الأكثر مبيعاً" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="لون الخلفية (Tailwind)" value={bgColor} onChange={setBgColor} placeholder="bg-gradient-to-br from-..." />
                        <Field label="النوع الفرعي (اختياري)" value={type} onChange={setType} placeholder="مثال: شاشة قيمنق" />
                    </div>
                    <Field label="رابط الصورة (اختياري)" value={imageUrl} onChange={setImageUrl} placeholder="https://..." />

                    {/* Offer Toggle */}
                    <div className="flex items-center gap-4 pt-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={isOffer} onChange={(e) => setIsOffer(e.target.checked)} className="w-5 h-5 rounded accent-brand-dark" />
                            <span className="font-bold text-slate-700 text-sm">عرض خاص؟</span>
                        </label>
                        {isOffer && (
                            <input
                                type="text" placeholder="نسبة الخصم (مثال: 20%)" value={offerDiscount}
                                onChange={(e) => setOfferDiscount(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                            />
                        )}
                    </div>
                </div>

                {/* Features */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">المميزات السريعة</h3>
                    {features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <input
                                type="text" value={feat} onChange={(e) => updateFeature(i, e.target.value)}
                                placeholder={`الميزة ${i + 1}`}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                            />
                            {features.length > 1 && (
                                <button type="button" onClick={() => removeFeature(i)} className="p-2 text-red-400 hover:text-red-600">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addFeature} className="flex items-center gap-1 text-brand-dark font-bold text-sm hover:underline">
                        <Plus className="w-4 h-4" /> إضافة ميزة
                    </button>
                </div>

                {/* Full Specs (Dynamic Key-Value) */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
                    <h3 className="text-lg font-bold text-slate-800 border-b border-slate-100 pb-3">المواصفات التفصيلية</h3>
                    {specs.map((spec, i) => (
                        <div key={i} className="flex items-start gap-2">
                            <input
                                type="text" value={spec.key} onChange={(e) => updateSpec(i, "key", e.target.value)}
                                placeholder="اسم المواصفة (مثال: الشاشة)"
                                className="w-1/3 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20"
                            />
                            <textarea
                                value={spec.value} onChange={(e) => updateSpec(i, "value", e.target.value)}
                                placeholder="تفاصيل المواصفة"
                                rows={2}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark/20 resize-none"
                            />
                            {specs.length > 1 && (
                                <button type="button" onClick={() => removeSpec(i)} className="p-2 text-red-400 hover:text-red-600 mt-1">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addSpec} className="flex items-center gap-1 text-brand-dark font-bold text-sm hover:underline">
                        <Plus className="w-4 h-4" /> إضافة مواصفة
                    </button>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3">
                    <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-100">
                        إلغاء
                    </button>
                    <button type="submit" disabled={saving || !name || !brand} className="flex items-center gap-2 px-8 py-3 rounded-xl bg-brand-dark text-white font-bold text-sm hover:opacity-90 disabled:opacity-50 shadow-md">
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isEdit ? "حفظ التعديلات" : "إضافة المنتج"}
                    </button>
                </div>
            </form>
        </div>
    );
}

// ---- Reusable Field ----
function Field({ label, value, onChange, type = "text", placeholder, required, step }: {
    label: string; value: string | number; onChange: (v: string) => void;
    type?: string; placeholder?: string; required?: boolean; step?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-bold text-slate-600 mb-1.5">{label}</label>
            <input
                type={type} value={value} onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} required={required} step={step}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-brand-dark/20 focus:border-brand-dark"
            />
        </div>
    );
}
