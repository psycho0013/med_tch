"use client";

import { useCart } from "@/lib/CartContext";
import { useCurrency } from "./CurrencyContext";
import { useToast } from "@/lib/ToastContext";
import { X, Trash2, Plus, Minus, ShoppingCart, MessageCircle, ArrowLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CartDrawer() {
    const { cartItems, removeFromCart, updateQuantity, totalPrice, totalItems, clearCart, isCartOpen, setIsCartOpen } = useCart();
    const { formatPrice, formatIQD, exchangeRate } = useCurrency();
    const toast = useToast();
    const [mounted, setMounted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState("");
    const [deliveryLocation, setDeliveryLocation] = useState<"none" | "inside" | "outside">("none");
    const [deliveryInsidePrice, setDeliveryInsidePrice] = useState(0);
    const [deliveryOutsidePrice, setDeliveryOutsidePrice] = useState(0);

    useEffect(() => {
        setMounted(true);
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data) {
                    if (data.delivery_inside) setDeliveryInsidePrice(data.delivery_inside);
                    if (data.delivery_outside) setDeliveryOutsidePrice(data.delivery_outside);
                }
            })
            .catch(err => console.error("Failed to load delivery settings:", err));
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

    const deliveryPriceIQD = deliveryLocation === "inside" ? deliveryInsidePrice : deliveryLocation === "outside" ? deliveryOutsidePrice : 0;

    const handleCheckout = async () => {
        if (!phoneNumber || phoneNumber.trim() === "") {
            toast.error("يرجى إدخال رقم الموبايل لتأكيد الطلب.");
            return;
        }

        setIsSubmitting(true);
        
        let orderText = `🛒 *طلب جديد من (مركز الروان)*\n\n` +
            `📞 *رقم الموبايل:* ${phoneNumber}\n\n` +
            cartItems.map(item => `▪️ ${item.product.name}\n   الكمية: ${item.quantity} | السعر: ${formatPrice(item.product.price_usd * item.quantity)}`).join("\n\n") +
            `\n\n💰 *الإجمالي للمنتجات:* ${formatPrice(totalPrice)}`;

        let finalTotalIQD = totalPrice * (exchangeRate / 100);

        if (deliveryLocation !== "none") {
            const locName = deliveryLocation === "inside" ? "داخل الناصرية" : "خارج الناصرية";
            orderText += `\n🚚 *التوصيل (${locName}):* ${formatIQD(deliveryPriceIQD)}`;
            finalTotalIQD += deliveryPriceIQD;
        }

        orderText += `\n\n💳 *المبلغ النهائي المطلوب دفعه:* ${formatIQD(finalTotalIQD)}`;

        try {
            const res = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ orderText }),
            });
            const data = await res.json();
            
            if (data.success) {
                toast.success("تم إرسال طلبك بنجاح! سنتواصل معك قريباً.");
                clearCart();
                setIsCartOpen(false);
            } else {
                toast.error("عذراً، حدث خطأ أثناء إرسال الطلب: " + (data.error || "خطأ غير معروف"));
            }
        } catch (error) {
            toast.error("حدث خطأ في الاتصال بالسيرفر. يرجى المحاولة مرة أخرى.");
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
                                <div className="w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center">
                                    <ShoppingCart className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-black text-white">سلة المشتريات</h2>
                                <span className="bg-white/10 text-white text-xs font-bold px-2 py-1 rounded-full border border-white/10">{totalItems}</span>
                            </div>
                            <button 
                                onClick={() => setIsCartOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="flex-1 overflow-y-auto p-6">
                            {cartItems.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                    <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mb-2 border border-white/10">
                                        <ShoppingCart className="w-10 h-10 text-zinc-600" />
                                    </div>
                                    <h3 className="text-xl font-bold text-white">السلة فارغة</h3>
                                    <p className="text-zinc-400 max-w-[250px]">لم تقم بإضافة أي منتجات إلى سلتك حتى الآن.</p>
                                    <button 
                                        onClick={() => setIsCartOpen(false)}
                                        className="mt-4 inline-flex items-center gap-2 text-white font-bold hover:underline"
                                    >
                                        متابعة التسوق <ArrowLeft className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {cartItems.map((item) => (
                                        <div key={item.product.id} className="flex gap-4 p-4 bg-zinc-900/50 rounded-2xl border border-white/10 shadow-sm relative group">
                                            <div className={`w-20 h-20 rounded-xl flex items-center justify-center shrink-0 ${item.product.bg_color ? item.product.bg_color.replace('bg-blue-50', 'bg-blue-900/20').replace('bg-indigo-50', 'bg-indigo-900/20').replace('bg-purple-50', 'bg-purple-900/20').replace('bg-slate-50', 'bg-white/5') : 'bg-white/5'}`}>
                                                {item.product.image_url ? (
                                                    <img src={item.product.image_url} alt={item.product.name} className="max-w-[80%] max-h-[80%] object-contain" />
                                                ) : (
                                                    <span className="text-2xl font-black text-white/30">{item.product.brand?.slice(0, 2) || 'PC'}</span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h4 className="text-white font-bold truncate mb-1 pr-6">{item.product.name}</h4>
                                                <p className="text-white font-black text-sm mb-3">{formatPrice(item.product.price_usd)}</p>
                                                <div className="flex items-center gap-3">
                                                    <div className="flex items-center bg-[#050505] rounded-lg border border-white/10">
                                                        <button 
                                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white disabled:opacity-50"
                                                        >
                                                            <Minus className="w-3 h-3" />
                                                        </button>
                                                        <span className="w-6 text-center font-bold text-sm text-white">{item.quantity}</span>
                                                        <button 
                                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                                            className="w-7 h-7 flex items-center justify-center text-zinc-400 hover:text-white"
                                                        >
                                                            <Plus className="w-3 h-3" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <button 
                                                onClick={() => removeFromCart(item.product.id)}
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
                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-[#050505]">
                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-zinc-400 text-sm">
                                        <span>المنتجات ({totalItems})</span>
                                        <span>{formatPrice(totalPrice)}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-zinc-400 text-sm">
                                        <span>التوصيل</span>
                                        <select 
                                            value={deliveryLocation}
                                            onChange={(e) => setDeliveryLocation(e.target.value as any)}
                                            className="bg-zinc-900 border border-white/10 text-white text-xs rounded-lg px-2 py-1 focus:outline-none focus:ring-1 focus:ring-brand-light"
                                        >
                                            <option value="none">يحدد لاحقاً</option>
                                            <option value="inside">داخل الناصرية (+{formatIQD(deliveryInsidePrice)})</option>
                                            <option value="outside">خارج الناصرية (+{formatIQD(deliveryOutsidePrice)})</option>
                                        </select>
                                    </div>
                                    {deliveryLocation !== "none" && (
                                        <div className="flex justify-between text-zinc-400 text-sm">
                                            <span>سعر التوصيل</span>
                                            <span>{formatIQD(deliveryPriceIQD)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-white font-black text-lg pt-3 border-t border-white/10 mt-2">
                                        <span>المبلغ النهائي (مع التوصيل)</span>
                                        <div className="text-left text-brand-light">
                                            {formatIQD((totalPrice * (exchangeRate / 100)) + deliveryPriceIQD)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-2 border-t border-white/10 pt-3 mt-2">
                                        <label className="text-zinc-400 text-sm font-bold">رقم الموبايل (مطلوب)</label>
                                        <input 
                                            type="tel"
                                            required
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="مثال: 07800000000"
                                            className="bg-[#111] border border-white/10 text-white rounded-lg px-3 py-2.5 focus:outline-none focus:border-white/30 focus:bg-white/5 transition-all w-full text-left"
                                            dir="ltr"
                                        />
                                    </div>
                                </div>
                                <button 
                                    onClick={handleCheckout}
                                    disabled={isSubmitting}
                                    className="w-full py-3.5 rounded-xl bg-white text-black font-bold text-base hover:bg-zinc-200 transition-all shadow-lg shadow-white/10 flex items-center justify-center gap-2 mb-3 disabled:opacity-70"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {isSubmitting ? "جاري الإرسال..." : "تأكيد الطلب"}
                                </button>
                                <button 
                                    onClick={clearCart}
                                    className="w-full py-3 rounded-xl bg-zinc-900 text-zinc-400 font-bold text-sm hover:bg-white/10 hover:text-white transition-colors border border-white/5"
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
