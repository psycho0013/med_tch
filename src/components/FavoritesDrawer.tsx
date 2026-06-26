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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", bounce: 0, duration: 0.4 }}
                        className="fixed top-0 bottom-0 left-0 w-full md:w-[450px] bg-[#0a0a0a] border-r border-white/10 z-50 flex flex-col shadow-2xl font-sans"
                    >
                        {/* Header */}
                        <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between bg-[#050505]">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center border border-red-500/20">
                                    <Heart className="w-5 h-5 fill-current" />
                                </div>
                                <h2 className="text-xl font-black text-white">المفضلات</h2>
                                <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-full border border-white/10">{favorites.length}</span>
                            </div>
                            <button 
                                onClick={() => setIsFavoritesOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {favorites.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-2 border border-white/10">
                                        <Heart className="w-10 h-10 text-red-500/30" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">لا توجد مفضلات</h3>
                                    <p className="text-zinc-400 max-w-[250px]">لم تقم بإضافة أي منتجات إلى مفضلاتك حتى الآن.</p>
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
                                        <div key={product.id} className="flex gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-white/10 shadow-sm relative group">
                                            <div className={`w-20 h-20 rounded-xl flex items-center justify-center shrink-0 ${product.bg_color ? product.bg_color.replace('bg-blue-50', 'bg-blue-900/20').replace('bg-indigo-50', 'bg-indigo-900/20').replace('bg-purple-50', 'bg-purple-900/20').replace('bg-slate-50', 'bg-white/5') : 'bg-white/5'}`}>
                                                {product.image_url ? (
                                                    <img src={product.image_url} alt={product.name} className="max-w-[80%] max-h-[80%] object-contain" />
                                                ) : (
                                                    <span className="text-sm font-black text-white/30">{product.brand?.slice(0, 2) || 'Al-RwanPc'}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0 flex flex-col">
                                                <h4 className="text-white font-bold truncate mb-1 pr-6">{product.name}</h4>
                                                <p className="text-zinc-400 text-xs mb-2 line-clamp-1">{product.features[0]}</p>
                                                <div className="mt-auto flex items-center justify-between">
                                                    <span className="text-white font-black text-sm">{formatPrice(product.price_usd)}</span>
                                                    <button 
                                                        onClick={() => {
                                                            addToCart(product);
                                                            // Optional: uncomment below to close favorites after adding to cart
                                                            // setIsFavoritesOpen(false);
                                                        }}
                                                        className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-colors shadow-sm"
                                                    >
                                                        <ShoppingCart className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromFavorites(product.id)}
                                                className="absolute top-4 left-4 p-1.5 text-zinc-500 hover:text-red-400 hover:bg-red-500/20 rounded-md transition-colors"
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
                            <div className="p-6 border-t border-white/10 bg-[#050505]">
                                <button 
                                    onClick={clearFavorites}
                                    className="w-full py-3.5 rounded-xl bg-red-500/10 text-red-500 font-bold text-base hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2 border border-red-500/20"
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
