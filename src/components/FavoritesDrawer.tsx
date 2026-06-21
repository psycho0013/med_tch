"use client";

import { useFavorites } from "@/lib/FavoritesContext";
import { useCart } from "@/lib/CartContext";
import { useCurrency } from "./CurrencyContext";
import { X, Trash2, Heart, ShoppingCart, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function FavoritesDrawer() {
    const { favorites, removeFromFavorites, isFavoritesOpen, setIsFavoritesOpen, clearFavorites } = useFavorites();
    const { addToCart } = useCart();
    const { formatPrice } = useCurrency();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when open
    useEffect(() => {
        if (isFavoritesOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isFavoritesOpen]);

    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isFavoritesOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsFavoritesOpen(false)}
                        className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed top-0 bottom-0 left-0 w-full md:w-[450px] bg-white z-50 flex flex-col shadow-2xl font-sans"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
                                    <Heart className="w-5 h-5 fill-current" />
                                </div>
                                <h2 className="text-xl font-black text-slate-900">المفضلات</h2>
                                <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">{favorites.length}</span>
                            </div>
                            <button 
                                onClick={() => setIsFavoritesOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {favorites.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mb-2 border border-red-100">
                                        <Heart className="w-10 h-10 text-red-200" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">لا توجد مفضلات</h3>
                                    <p className="text-slate-500 max-w-[250px]">لم تقم بإضافة أي منتجات إلى مفضلاتك حتى الآن.</p>
                                    <button 
                                        onClick={() => setIsFavoritesOpen(false)}
                                        className="mt-4 inline-flex items-center gap-2 text-red-500 font-bold hover:underline"
                                    >
                                        تصفح المنتجات <ArrowLeft className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {favorites.map((product) => (
                                        <div key={product.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm relative group">
                                            <div className={`w-20 h-20 rounded-xl flex items-center justify-center shrink-0 ${product.bg_color || 'bg-slate-50'}`}>
                                                <span className="text-2xl font-black text-white/50">{product.brand?.slice(0, 2) || 'TC'}</span>
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col">
                                                <h4 className="text-slate-900 font-bold truncate mb-1 pr-6">{product.name}</h4>
                                                <p className="text-slate-500 text-xs mb-2 line-clamp-1">{product.features[0]}</p>
                                                <div className="mt-auto flex items-center justify-between">
                                                    <span className="text-brand-dark font-black text-sm">{formatPrice(product.price_usd)}</span>
                                                    <button 
                                                        onClick={() => {
                                                            addToCart(product);
                                                            // Optional: uncomment below to close favorites after adding to cart
                                                            // setIsFavoritesOpen(false);
                                                        }}
                                                        className="w-8 h-8 rounded-lg bg-brand-dark text-white flex items-center justify-center hover:bg-brand-light transition-colors shadow-sm"
                                                    >
                                                        <ShoppingCart className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromFavorites(product.id)}
                                                className="absolute top-4 left-4 p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        {favorites.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                                <button 
                                    onClick={clearFavorites}
                                    className="w-full py-3.5 rounded-xl bg-red-50 text-red-500 font-bold text-base hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                >
                                    <Trash2 className="w-5 h-5" />
                                    حذف كل المفضلات
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
