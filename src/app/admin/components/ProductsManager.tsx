"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, RefreshCw, Loader2 } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/types";
import ProductForm from "./ProductForm";

const categoryLabels: Record<ProductCategory, string> = {
    pcs: "تجميعات الـ PC",
    parts: "قطع PC المنفصلة",
    monitors: "الشاشات",
    accessories: "إكسسوارات ومستلزمات",
};

const singularLabels: Record<ProductCategory, string> = {
    pcs: "تجميعة",
    parts: "قطعة",
    monitors: "شاشة",
    accessories: "منتج",
};

export default function ProductsManager({ category }: { category: ProductCategory }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/products?category=${category}`);
            const data = await res.json();
            setProducts(Array.isArray(data) ? data : []);
        } catch (err) {
            console.error("Failed to fetch products:", err);
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchProducts();
        setShowForm(false);
        setEditingProduct(null);
        setSearchQuery("");
    }, [category, fetchProducts]);

    const handleDelete = async (id: string) => {
        try {
            await fetch(`/api/products?id=${id}`, { method: "DELETE" });
            setProducts((prev) => prev.filter((p) => p.id !== id));
            setDeleteConfirm(null);
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };

    const handleFormSuccess = () => {
        setShowForm(false);
        setEditingProduct(null);
        fetchProducts();
    };

    const filteredProducts = products.filter(
        (p) =>
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
            p.tag.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // ---- Show Form ----
    if (showForm || editingProduct) {
        return (
            <ProductForm
                category={category}
                existingProduct={editingProduct}
                onSuccess={handleFormSuccess}
                onCancel={() => { setShowForm(false); setEditingProduct(null); }}
            />
        );
    }

    const singular = singularLabels[category] || "منتج";

    // ---- Products List ----
    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-white">
                        إدارة {categoryLabels[category]}
                    </h2>
                    <p className="text-zinc-500 text-sm font-medium mt-1">
                        {products.length} {singular} في هذا القسم
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchProducts}
                        className="p-2.5 rounded-xl border border-white/10 text-zinc-400 hover:bg-white/5 transition-colors"
                        title="تحديث"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        إضافة {singular}
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="w-5 h-5 text-zinc-500 absolute right-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder={`ابحث عن اسم ال${singular}، العلامة التجارية، أو الوسم...`}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-white/10 bg-[#0a0a0a] text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-brand-light/30 focus:border-brand-light/50 text-sm font-medium"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-brand-dark animate-spin" />
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-zinc-600" />
                    </div>
                    <h3 className="text-lg font-bold text-zinc-300 mb-2">لا توجد منتجات</h3>
                    <p className="text-zinc-500 text-sm mb-4">
                        {searchQuery ? "لا توجد نتائج للبحث" : `أضف أول ${singular} في هذا القسم`}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-2.5 rounded-xl bg-brand-dark text-white font-bold text-sm"
                        >
                            إضافة {singular} جديد
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-white/10 bg-[#050505]">
                                    <th className="text-right px-5 py-4 font-bold text-zinc-400">اسم ال{singular}</th>
                                    <th className="text-right px-5 py-4 font-bold text-zinc-400">الوسم</th>
                                    <th className="text-right px-5 py-4 font-bold text-zinc-400">السعر (USD)</th>
                                    <th className="text-right px-5 py-4 font-bold text-zinc-400">السعر (IQD)</th>
                                    <th className="text-right px-5 py-4 font-bold text-zinc-400">التقييم</th>
                                    <th className="text-center px-5 py-4 font-bold text-zinc-400">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="font-bold text-white">{product.name}</div>
                                            <div className="text-xs text-zinc-500 mt-0.5">{product.brand}</div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="px-2 py-1 bg-white/10 text-zinc-300 text-xs font-bold rounded-md">
                                                {product.tag}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 font-bold text-white">${product.price_usd}</td>
                                        <td className="px-5 py-4 text-zinc-400">{product.price_iqd?.toLocaleString("ar-IQ")} د.ع</td>
                                        <td className="px-5 py-4">
                                            <span className="text-yellow-600 font-bold">⭐ {product.rating}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => setEditingProduct(product)}
                                                    className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-colors"
                                                    title="تعديل"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </button>

                                                {deleteConfirm === product.id ? (
                                                    <div className="flex gap-1">
                                                        <button
                                                            onClick={() => handleDelete(product.id)}
                                                            className="px-2 py-1 rounded-lg bg-red-500 text-white text-xs font-bold hover:bg-red-600"
                                                        >
                                                            تأكيد
                                                        </button>
                                                        <button
                                                            onClick={() => setDeleteConfirm(null)}
                                                            className="px-2 py-1 rounded-lg bg-white/10 text-zinc-300 text-xs font-bold hover:bg-white/20"
                                                        >
                                                            إلغاء
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setDeleteConfirm(product.id)}
                                                        className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                                                        title="حذف"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
