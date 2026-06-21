"use client";

import { useCart } from "@/lib/CartContext";
import { useCurrency } from "./CurrencyContext";
import { X, Trash2, Plus, Minus, ShoppingCart, MessageCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart, isCartOpen, setIsCartOpen } = useCart();
    const { formatPrice } = useCurrency();
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent body scroll when open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [isCartOpen]);

    if (!mounted) return null;

    const handleCheckout = async () => {
        setIsSubmitting(true);
        const text = `🛒 <b>طلب جديد من (مركز الروان)</b>\n\n` +
            cartItems.map(item => `▪️ ${item.product.name}\n   الكمية: ${item.quantity} | السعر: ${formatPrice(item.product.price_usd * item.quantity)}`).join("\n\n") +
            `\n\n💰 <b>الإجمالي: ${formatPrice(totalPrice)}</b>`;
        
        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderText: text }),
            });
            const data = await res.json();
            
            if (data.success) {
                alert("تم إرسال طلبك بنجاح! سنتواصل معك قريباً.");
                clearCart();
                setIsCartOpen(false);
            } else {
                alert("عذراً، حدث خطأ أثناء إرسال الطلب: " + (data.error || "خطأ غير معروف"));
            }
        } catch (error) {
            alert("حدث خطأ في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
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
                                <div className="w-10 h-10 rounded-full bg-brand-light/20 text-brand-dark flex items-center justify-center">
                                    <ShoppingCart className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-black text-slate-900">سلة المشتريات</h2>
                                <span className="bg-slate-200 text-slate-700 text-xs font-bold px-2 py-1 rounded-full">{totalItems}</span>
                            </div>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-2 border border-slate-100">
                                        <ShoppingCart className="w-10 h-10 text-slate-300" />
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-800">السلة فارغة</h3>
                                    <p className="text-slate-500 max-w-[250px]">لم تقم بإضافة أي منتجات إلى سلتك حتى الآن.</p>
                                    <button 
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 inline-flex items-center gap-2 text-brand-dark font-bold hover:underline"
                                    >
                                        متابعة التسوق <ArrowLeft className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 p-4 bg-white rounded-2xl border border-slate-100 shadow-sm relative group">
                                            <div className={`w-20 h-20 rounded-xl flex items-center justify-center shrink-0 ${item.product.bg_color || 'bg-slate-50'}`}>
                                                <span className="text-2xl font-black text-white/50">{item.product.brand?.slice(0, 2) || 'PC'}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-slate-900 font-bold truncate mb-1 pr-6">{item.product.name}</h4>
                                                <p className="text-brand-dark font-black text-sm mb-3">{formatPrice(item.product.price_usd)}</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200">
                                                        <button 
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-brand-dark disabled:opacity-50"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-6 text-center font-bold text-sm text-slate-700">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-7 h-7 flex items-center justify-center text-slate-500 hover:text-brand-dark"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.product.id)}
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
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-slate-100 bg-white shadow-[0_-10px_20px_rgba(0,0,0,0.02)]">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-slate-500 text-sm">
                                        <span>المنتجات ({totalItems})</span>
                                        <span>{formatPrice(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between text-slate-500 text-sm">
                                        <span>التوصيل</span>
                                        <span>يحدد لاحقاً</span>
                                    </div>
                                    <div className="flex justify-between text-slate-900 font-black text-lg pt-3 border-t border-slate-100">
                                        <span>المجموع</span>
                                        <span className="text-brand-dark">{formatPrice(totalPrice)}</span>
                                    </div>
                                </div>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold text-base hover:from-blue-600 hover:to-blue-700 transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 mb-3 disabled:opacity-70"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
                                </button>
                                <button 
                                    onClick={clearCart}
                                    className="w-full py-3 rounded-xl bg-slate-50 text-slate-600 font-bold text-sm hover:bg-slate-100 transition-colors"
                                >
                                    إفراغ السلة
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
