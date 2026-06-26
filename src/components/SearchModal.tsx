"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, ChevronLeft } from "lucide-react";
import type { Product } from "@/lib/types";
import { useCurrency } from "./CurrencyContext";
import SpecsModal from "./SpecsModal";

export default function SearchModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const { formatPrice } = useCurrency();
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (isOpen && products.length === 0) {
            setLoading(true);
            fetch("/api/products")
                .then(res => res.json())
                .then(data => {
                    if (Array.isArray(data)) setProducts(data);
                })
                .finally(() => setLoading(false));
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setSearchTerm("");
            setSelectedProduct(null);
        }
    }, [isOpen]);

    // Prevent body scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    const filteredProducts = products.filter(p => 
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.brand && p.brand.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <>
                    <motion.div
                        key="search-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                    />
                    <motion.div
                        key="search-modal"
                        initial={{ opacity: 0, scale: 0.95, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -20 }}
                        className="fixed top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl z-[61] overflow-hidden shadow-2xl"
                    >
                        {/* Search Input */}
                        <div className="relative border-b border-white/10 p-4 flex items-center">
                            <Search className="absolute right-8 w-6 h-6 text-zinc-400 pointer-events-none" />
                            <input
                                autoFocus
                                type="text"
                                placeholder="ابحث عن منتج، فئة، أو ماركة..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-[#111] text-white text-lg rounded-2xl py-4 pr-16 pl-14 focus:outline-none focus:ring-2 focus:ring-brand-light/30 border border-white/5"
                            />
                            <button
                                onClick={onClose}
                                className="absolute left-6 p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Results */}
                        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
                            {loading ? (
                                <div className="text-center py-10 text-zinc-400 font-bold animate-pulse">جاري تحميل المنتجات...</div>
                            ) : searchTerm.length > 0 && filteredProducts.length === 0 ? (
                                <div className="text-center py-10 text-zinc-400">لا توجد نتائج مطابقة لبحثك "{searchTerm}"</div>
                            ) : searchTerm.length === 0 ? (
                                <div className="text-center py-10 text-zinc-500">اكتب اسم المنتج أو الماركة للبحث...</div>
                            ) : (
                                filteredProducts.map(product => (
                                    <div 
                                        key={product.id}
                                        onClick={() => setSelectedProduct(product)}
                                        className="flex items-center gap-4 p-3 rounded-2xl hover:bg-white/5 cursor-pointer transition-colors border border-transparent hover:border-white/10 group"
                                    >
                                        <div className="w-16 h-16 rounded-xl bg-white/5 p-2 shrink-0 flex items-center justify-center">
                                            {product.image_url ? (
                                                <img src={product.image_url} alt={product.name} className="max-w-full max-h-full object-contain" />
                                            ) : (
                                                <Search className="w-6 h-6 text-zinc-600" />
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h4 className="text-white font-bold truncate group-hover:text-brand-light transition-colors">{product.name}</h4>
                                            <p className="text-zinc-400 text-sm">{product.category}</p>
                                        </div>
                                        <div className="text-left shrink-0 pl-2">
                                            <span className="text-white font-black">{formatPrice(product.price_usd)}</span>
                                            <ChevronLeft className="w-5 h-5 text-zinc-500 mr-2 inline-block group-hover:text-white transition-colors" />
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </motion.div>
                </>
            )}
            </AnimatePresence>
            <SpecsModal isOpen={!!selectedProduct} onClose={() => setSelectedProduct(null)} product={selectedProduct} />
        </>
    );
}
