"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import type { Product } from "@/lib/types";

interface SpecsModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: Product | null;
    titleIcon?: React.ReactNode;
}

export default function SpecsModal({ isOpen, onClose, product, titleIcon }: SpecsModalProps) {
    const { formatPrice } = useCurrency();
    const [mounted, setMounted] = useState(false);
    const [cachedProduct, setCachedProduct] = useState(product);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Store product in state when it opens, to keep it mounted during exit animation
    if (product && product.id !== cachedProduct?.id) {
        setCachedProduct(product);
    }

    if (!mounted) return null;

    const displayProduct = product || cachedProduct;

    // Use correct field names
    const specs = displayProduct?.full_specs || {};
    const priceUSD = displayProduct?.price_usd || 0;

    return createPortal(
        <AnimatePresence>
            {isOpen && displayProduct && (
                <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Window */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative w-full max-w-2xl bg-[#0a0a0a] rounded-3xl shadow-2xl overflow-hidden border border-white/10 flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#050505]">
                            <div className="flex items-center gap-3">
                                {titleIcon && <div className="text-white">{titleIcon}</div>}
                                <div>
                                    <h3 className="text-2xl font-black text-white">{displayProduct.name}</h3>
                                    <p className="text-sm font-bold text-zinc-400">{displayProduct.brand}</p>
                                </div>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full bg-white/5 text-zinc-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                                title="إغلاق"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body (Scrollable) */}
                        <div className="p-6 overflow-y-auto flex-1 custom-scrollbar">
                            <div className="grid sm:grid-cols-2 gap-4">
                                {Object.entries(specs).map(([key, value]) => (
                                    <div key={key} className="bg-[#050505] rounded-2xl p-4 border border-white/10 hover:border-white/30 transition-colors">
                                        <div className="text-xs font-bold text-zinc-400 mb-1">{key}</div>
                                        <div className="text-sm font-medium text-white leading-relaxed">
                                            {value as React.ReactNode}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="p-6 border-t border-white/10 bg-[#050505] flex items-center justify-between gap-4">
                            <div>
                                <div className="text-xs text-zinc-400 font-bold mb-1">السعر التقريبي</div>
                                <div className="text-2xl font-black text-white">${priceUSD}</div>
                            </div>
                            <button
                                onClick={onClose}
                                className="px-6 py-3 rounded-xl bg-white text-black font-bold hover:bg-zinc-200 transition-colors shadow-lg shadow-white/10"
                            >
                                حسناً، فهمت
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
