"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Plus, Trash2, Save, Loader2, Calculator, Cpu, Monitor, HardDrive, Zap, Wind, Box, Image as ImageIcon, Upload } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/types";
import { compressImage } from "@/lib/imageUtils";

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
    const [exchangeRate, setExchangeRate] = useState(1500);
    const [rating, setRating] = useState(existingProduct?.rating || 0);
    const [tag, setTag] = useState(existingProduct?.tag || "");
    const [bgColor, setBgColor] = useState(existingProduct?.bg_color || "bg-gradient-to-br from-slate-100 to-slate-50");
    const [type, setType] = useState(existingProduct?.type || "");
    const [imageUrl, setImageUrl] = useState(existingProduct?.image_url || "");
    const [isOffer, setIsOffer] = useState(existingProduct?.is_offer || false);
    const [offerDiscount, setOfferDiscount] = useState(existingProduct?.offer_discount || "");
    const [features, setFeatures] = useState<string[]>(existingProduct?.features || ["", "", ""]);

    // ---- Dedicated PC Specs State ----
    const specsData = existingProduct?.full_specs || {};
    const [cpu, setCpu] = useState(specsData["المعالج (CPU)"] || "");
    const [gpu, setGpu] = useState(specsData["كرت الشاشة (GPU)"] || "");
    const [motherboard, setMotherboard] = useState(specsData["اللوحة الأم (Motherboard)"] || "");
    const [ram, setRam] = useState(specsData["الرامات (RAM)"] || "");
    const [storage, setStorage] = useState(specsData["مساحة التخزين (Storage)"] || "");
    const [pcCase, setPcCase] = useState(specsData["الكيس (Case)"] || "");
    const [psu, setPsu] = useState(specsData["مزود الطاقة (Power Supply)"] || "");
    const [cooling, setCooling] = useState(specsData["التبريد (Cooling)"] || "");

    // ---- Generic Specs State (For parts, monitors, accessories) ----
    const initialGenericSpecs = existingProduct?.full_specs && category !== "pcs"
        ? Object.entries(existingProduct.full_specs).map(([key, value]) => ({ key, value }))
        : [{ key: "", value: "" }];
    const [genericSpecs, setGenericSpecs] = useState<{ key: string; value: string }[]>(initialGenericSpecs);

    const [saving, setSaving] = useState(false);
    const [uploadingImage, setUploadingImage] = useState(false);

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data?.exchange_rate) setExchangeRate(data.exchange_rate);
            })
            .catch(err => console.error(err));
    }, []);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploadingImage(true);
        try {
            // Compress the image before uploading (Max dimension 1200px, 70% quality)
            const compressedFile = await compressImage(file, 1200, 0.7);

            const formData = new FormData();
            formData.append("file", compressedFile);

            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await res.json();
            if (res.ok && data.url) {
                setImageUrl(data.url);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        const fullSpecs: Record<string, string> = {};

        if (category === "pcs") {
            if (cpu) fullSpecs["المعالج (CPU)"] = cpu;
            if (gpu) fullSpecs["كرت الشاشة (GPU)"] = gpu;
            if (motherboard) fullSpecs["اللوحة الأم (Motherboard)"] = motherboard;
            if (ram) fullSpecs["الرامات (RAM)"] = ram;
            if (storage) fullSpecs["مساحة التخزين (Storage)"] = storage;
            if (pcCase) fullSpecs["الكيس (Case)"] = pcCase;
            if (psu) fullSpecs["مزود الطاقة (Power Supply)"] = psu;
            if (cooling) fullSpecs["التبريد (Cooling)"] = cooling;
        } else {
            genericSpecs.forEach((s) => {
                if (s.key.trim()) fullSpecs[s.key.trim()] = s.value.trim();
            });
        }

        const payload: any = {
            category,
            name,
            brand,
            price_usd: priceUSD,
            price_iqd: priceUSD * (exchangeRate / 100),
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

    // ---- Helpers ----
    const updateFeature = (i: number, val: string) => {
        const copy = [...features];
        copy[i] = val;
        setFeatures(copy);
    };
    const addFeature = () => setFeatures([...features, ""]);
    const removeFeature = (i: number) => setFeatures(features.filter((_, idx) => idx !== i));

    const updateGenericSpec = (i: number, field: "key" | "value", val: string) => {
        const copy = [...genericSpecs];
        copy[i][field] = val;
        setGenericSpecs(copy);
    };
    const addGenericSpec = () => setGenericSpecs([...genericSpecs, { key: "", value: "" }]);
    const removeGenericSpec = (i: number) => setGenericSpecs(genericSpecs.filter((_, idx) => idx !== i));

    const isPC = category === "pcs";

    return (
        <div>
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button onClick={onCancel} className="p-2 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5">
                    <ArrowRight className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-black text-white">
                    {isEdit ? `تعديل: ${existingProduct.name}` : `إضافة منتج جديد`}
                </h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
                {/* Basic Info */}
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 space-y-5 shadow-sm">
                    <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                        <Box className="w-5 h-5 text-brand-light" /> المعلومات الأساسية
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <Field label="الاسم" value={name} onChange={setName} required placeholder="مثال: اسم المنتج أو التجميعة" />
                        <Field label="العلامة التجارية" value={brand} onChange={setBrand} required placeholder="مثال: Custom Build, ASUS, الخ" />
                        <Field label="السعر (USD)" value={priceUSD} onChange={(v) => setPriceUSD(Number(v))} type="number" required />
                        <div>
                            <label className="block text-sm font-bold text-zinc-400 mb-1.5 flex items-center gap-1.5">
                                <Calculator className="w-4 h-4 text-emerald-500" />
                                السعر (IQD) - محسوب تلقائياً
                            </label>
                            <input
                                type="text"
                                value={(priceUSD * (exchangeRate / 100)).toLocaleString() + " د.ع"}
                                disabled
                                className="w-full px-4 py-2.5 rounded-xl border border-emerald-900/30 bg-emerald-900/10 text-emerald-400 font-bold text-sm focus:outline-none cursor-not-allowed"
                            />
                        </div>
                        <Field label="التقييم (من 5)" value={rating} onChange={(v) => setRating(Number(v))} type="number" step="0.1" />
                        <Field label="الوسم المميز" value={tag} onChange={setTag} placeholder="مثال: الأكثر مبيعاً، جديد" />
                        <Field label="لون الخلفية (Tailwind)" value={bgColor} onChange={setBgColor} placeholder="bg-gradient-to-br from-..." />
                        {!isPC && <Field label="النوع الفرعي (اختياري)" value={type} onChange={setType} placeholder="مثال: شاشة قيمنق" />}
                    </div>

                    {/* Image Upload Section */}
                    <div className="pt-2">
                        <label className="block text-sm font-bold text-zinc-400 mb-1.5 flex items-center gap-1.5">
                            <ImageIcon className="w-4 h-4 text-brand-light" /> صورة المنتج (يتم ضغطها تلقائياً لتوفير المساحة)
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="relative cursor-pointer flex-1">
                                <div className="w-full px-4 py-3 rounded-xl border-2 border-dashed border-white/20 hover:border-brand-light/50 hover:bg-brand-light/5 transition-colors flex items-center justify-center gap-2">
                                    {uploadingImage ? (
                                        <>
                                            <Loader2 className="w-5 h-5 text-brand-light animate-spin" />
                                            <span className="text-sm font-bold text-brand-light">جاري الضغط والرفع...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Upload className="w-5 h-5 text-zinc-500" />
                                            <span className="text-sm font-bold text-zinc-400">اختر صورة من جهازك</span>
                                        </>
                                    )}
                                </div>
                                <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} />
                            </label>
                            {imageUrl && (
                                <div className="w-14 h-14 rounded-xl border border-white/10 overflow-hidden bg-white/5 shrink-0">
                                    <img src={imageUrl} alt="Preview" className="w-full h-full object-contain p-1" />
                                </div>
                            )}
                        </div>
                        {imageUrl && (
                            <p className="text-xs text-emerald-600 font-bold mt-2">تم رفع الصورة بنجاح وتجهيزها.</p>
                        )}
                    </div>

                    {/* Offer Toggle */}
                    <div className="flex items-center gap-4 pt-2 border-t border-white/10">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={isOffer} onChange={(e) => setIsOffer(e.target.checked)} className="w-5 h-5 rounded accent-brand-light" />
                            <span className="font-bold text-white text-sm">هل المنتج ضمن عرض خاص؟</span>
                        </label>
                        {isOffer && (
                            <input
                                type="text" placeholder="مثال: خصم 50$ لفترة محدودة" value={offerDiscount}
                                onChange={(e) => setOfferDiscount(e.target.value)}
                                className="flex-1 px-4 py-2 rounded-xl border border-white/10 bg-[#000000] text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-light/30"
                            />
                        )}
                    </div>
                </div>

                {/* Specs Section (Conditional) */}
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 space-y-6 shadow-sm border-t-4 border-t-brand-light">
                    <h3 className="text-xl font-black text-white border-b border-white/10 pb-3 flex items-center gap-2">
                        {isPC ? <Cpu className="w-6 h-6 text-brand-light" /> : <HardDrive className="w-6 h-6 text-brand-light" />}
                        {isPC ? "مواصفات القطع (PC Specs)" : "المواصفات التفصيلية"}
                    </h3>

                    {isPC ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <SpecField label="المعالج (CPU)" value={cpu} onChange={setCpu} placeholder="مثال: Intel Core i5-13400F" icon={<Cpu className="w-4 h-4" />} />
                            <SpecField label="كرت الشاشة (GPU)" value={gpu} onChange={setGpu} placeholder="مثال: RTX 4060 8GB" icon={<Monitor className="w-4 h-4" />} />
                            <SpecField label="الرامات (RAM)" value={ram} onChange={setRam} placeholder="مثال: 16GB (8x2) DDR5 5200MHz" icon={<Zap className="w-4 h-4" />} />
                            <SpecField label="مساحة التخزين (Storage)" value={storage} onChange={setStorage} placeholder="مثال: 1TB NVMe M.2 SSD" icon={<HardDrive className="w-4 h-4" />} />
                            <SpecField label="اللوحة الأم (Motherboard)" value={motherboard} onChange={setMotherboard} placeholder="مثال: B760M" icon={<Box className="w-4 h-4" />} />
                            <SpecField label="مزود الطاقة (Power Supply)" value={psu} onChange={setPsu} placeholder="مثال: 600W 80+ Bronze" icon={<Zap className="w-4 h-4" />} />
                            <SpecField label="التبريد (Cooling)" value={cooling} onChange={setCooling} placeholder="مثال: DeepCool AG400 ARGB" icon={<Wind className="w-4 h-4" />} />
                            <SpecField label="الكيس (Case)" value={pcCase} onChange={setPcCase} placeholder="مثال: NZXT H5 Flow" icon={<Box className="w-4 h-4" />} />
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {genericSpecs.map((spec, i) => (
                                <div key={i} className="flex items-start gap-2">
                                    <input
                                        type="text" value={spec.key} onChange={(e) => updateGenericSpec(i, "key", e.target.value)}
                                        placeholder="اسم المواصفة (مثال: الشاشة)"
                                        className="w-1/3 px-4 py-2.5 rounded-xl border border-white/10 bg-[#000000] text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-light/30"
                                    />
                                    <textarea
                                        value={spec.value} onChange={(e) => updateGenericSpec(i, "value", e.target.value)}
                                        placeholder="تفاصيل المواصفة"
                                        rows={2}
                                        className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#000000] text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-light/30 resize-none"
                                    />
                                    {genericSpecs.length > 1 && (
                                        <button type="button" onClick={() => removeGenericSpec(i)} className="p-2 text-red-400 hover:text-red-300 mt-1 bg-red-500/10 rounded-lg">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addGenericSpec} className="flex items-center gap-1 text-brand-light font-bold text-sm hover:underline w-fit mt-2">
                                <Plus className="w-4 h-4" /> إضافة مواصفة
                            </button>
                        </div>
                    )}
                </div>

                {/* Features */}
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 p-6 space-y-4 shadow-sm">
                    <h3 className="text-lg font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-amber-500" /> نقاط القوة (أسباب الشراء)
                    </h3>
                    {features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <input
                                type="text" value={feat} onChange={(e) => updateFeature(i, e.target.value)}
                                placeholder={`النقطة ${i + 1} (مثال: أداء ممتاز لألعاب 2K)`}
                                className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 bg-[#000000] text-white text-sm focus:outline-none focus:ring-2 focus:ring-brand-light/30"
                            />
                            {features.length > 1 && (
                                <button type="button" onClick={() => removeFeature(i)} className="p-2 text-red-400 hover:text-red-300 bg-red-500/10 rounded-lg">
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                    ))}
                    <button type="button" onClick={addFeature} className="flex items-center gap-1 text-brand-light font-bold text-sm hover:underline w-fit mt-2">
                        <Plus className="w-4 h-4" /> إضافة نقطة إضافية
                    </button>
                </div>

                {/* Submit */}
                <div className="flex justify-end gap-3 pb-12">
                    <button type="button" onClick={onCancel} className="px-6 py-3 rounded-xl border border-white/10 text-zinc-400 font-bold text-sm hover:bg-white/5 transition-colors">
                        إلغاء الرجوع للوحة
                    </button>
                    <button type="submit" disabled={saving || uploadingImage || !name || !brand} className="flex items-center gap-2 px-10 py-3 rounded-xl bg-white text-black font-bold text-sm hover:bg-zinc-200 disabled:opacity-50 shadow-lg shadow-white/10 transition-all hover:-translate-y-0.5">
                        {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                        {isEdit ? "حفظ التعديلات" : "نشر المنتج الآن"}
                    </button>
                </div>
            </form>
        </div>
    );
}

// ---- Reusable Field ----
function Field({ label, value, onChange, type = "text", placeholder, required, step, dir }: {
    label: string; value: string | number; onChange: (v: string) => void;
    type?: string; placeholder?: string; required?: boolean; step?: string; dir?: string;
}) {
    return (
        <div>
            <label className="block text-sm font-bold text-zinc-400 mb-1.5">{label}</label>
            <input
                type={type} value={value} onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} required={required} step={step} dir={dir}
                className={`w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#000000] text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 focus:border-brand-light/50 ${dir === 'ltr' ? 'text-left' : ''}`}
            />
        </div>
    );
}

// ---- Spec Field ----
function SpecField({ label, value, onChange, placeholder, icon }: {
    label: string; value: string; onChange: (v: string) => void; placeholder: string; icon: React.ReactNode;
}) {
    return (
        <div>
            <label className="text-sm font-bold text-zinc-300 mb-1.5 flex items-center gap-1.5">
                <span className="text-zinc-500">{icon}</span> {label}
            </label>
            <input
                type="text" value={value} onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder} dir="ltr"
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-light/30 focus:border-brand-light/50 text-left bg-[#000000] focus:bg-[#0a0a0a] transition-colors"
            />
        </div>
    );
}
