"use client";

import { useState, useEffect, useCallback } from "react";
import { Plus, Pencil, Trash2, Search, RefreshCw, Loader2 } from "lucide-react";
import type { Product, ProductCategory } from "@/lib/types";
import ProductForm from "./ProductForm";

const categoryLabels: Record<ProductCategory, string> = {
    android: "هواتف أندرويد",
    ios: "هواتف آيفون",
    laptops: "لابتوبات",
    pcs: "تجميعات PC",
    monitors: "شاشات",
    accessories: "إكسسوارات",
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

    // ---- Products List ----
    return (
        <div>
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
                <div>
                    <h2 className="text-2xl font-black text-slate-900">
                        إدارة {categoryLabels[category]}
                    </h2>
                    <p className="text-slate-500 text-sm font-medium mt-1">
                        {products.length} منتج في هذا القسم
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchProducts}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-100 transition-colors"
                        title="تحديث"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-dark text-white font-bold text-sm hover:opacity-90 transition-opacity shadow-md"
                    >
                        <Plus className="w-5 h-5" />
                        إضافة منتج
                    </button>
                </div>
            </div>

            {/* Search */}
            <div className="relative mb-6">
                <Search className="w-5 h-5 text-slate-400 absolute right-4 top-1/2 -translate-y-1/2" />
                <input
                    type="text"
                    placeholder="ابحث عن اسم المنتج، العلامة التجارية، أو الوسم..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-dark/30 focus:border-brand-dark text-sm font-medium"
                />
            </div>

            {/* Table */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-brand-dark animate-spin" />
                </div>
            ) : filteredProducts.length === 0 ? (
                <div className="text-center py-20">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-300" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-700 mb-2">لا توجد منتجات</h3>
                    <p className="text-slate-500 text-sm mb-4">
                        {searchQuery ? "لا توجد نتائج للبحث" : "أضف أول منتج في هذا القسم"}
                    </p>
                    {!searchQuery && (
                        <button
                            onClick={() => setShowForm(true)}
                            className="px-6 py-2.5 rounded-xl bg-brand-dark text-white font-bold text-sm"
                        >
                            إضافة منتج جديد
                        </button>
                    )}
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50">
                                    <th className="text-right px-5 py-4 font-bold text-slate-600">المنتج</th>
                                    <th className="text-right px-5 py-4 font-bold text-slate-600">الوسم</th>
                                    <th className="text-right px-5 py-4 font-bold text-slate-600">السعر (USD)</th>
                                    <th className="text-right px-5 py-4 font-bold text-slate-600">السعر (IQD)</th>
                                    <th className="text-right px-5 py-4 font-bold text-slate-600">التقييم</th>
                                    <th className="text-center px-5 py-4 font-bold text-slate-600">إجراءات</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredProducts.map((product) => (
                                    <tr key={product.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                                        <td className="px-5 py-4">
                                            <div className="font-bold text-slate-800">{product.name}</div>
                                            <div className="text-xs text-slate-500 mt-0.5">{product.brand}</div>
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded-md">
                                                {product.tag}
                                            </span>
                                        </td>
                                        <td className="px-5 py-4 font-bold text-slate-700">${product.price_usd}</td>
                                        <td className="px-5 py-4 text-slate-600">{product.price_iqd?.toLocaleString("ar-IQ")} د.ع</td>
                                        <td className="px-5 py-4">
                                            <span className="text-yellow-600 font-bold">⭐ {product.rating}</span>
                                        </td>
                                        <td className="px-5 py-4">
                                            <div className="flex items-center justify-center gap-2">
                                                <button
                                                    onClick={() => setEditingProduct(product)}
                                                    className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
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
                                                            className="px-2 py-1 rounded-lg bg-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-300"
                                                        >
                                                            إلغاء
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <button
                                                        onClick={() => setDeleteConfirm(product.id)}
                                                        className="p-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
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
