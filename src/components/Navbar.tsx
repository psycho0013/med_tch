"use client";

import { useState, useEffect } from "react";
import { default as NextLink } from "next/link";
import { Menu, X, User, Monitor, Tv, Mouse, ArrowRightLeft, ShoppingCart, Heart, Smartphone, Home } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "./LoginModal";
import { useCurrency } from "./CurrencyContext";
import { useCart } from "@/lib/CartContext";
import { useFavorites } from "@/lib/FavoritesContext";

export default function Navbar() {
    const { currency, setCurrency } = useCurrency();
    const { totalItems, setIsCartOpen } = useCart();
    const { totalFavorites, setIsFavoritesOpen } = useFavorites();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [partnerName, setPartnerName] = useState("");
    const [partnerUrl, setPartnerUrl] = useState("");

    useEffect(() => {
        fetch("/api/settings")
            .then(res => res.json())
            .then(data => {
                if (data) {
                    if (data.logo_url) setLogoUrl(data.logo_url);
                    if (data.partner_name) setPartnerName(data.partner_name);
                    if (data.partner_url) setPartnerUrl(data.partner_url);
                }
            })
            .catch(() => {});
    }, []);

    const toggleCurrency = () => {
        setCurrency(currency === "IQD" ? "USD" : "IQD");
    };

    const navLinks = [
        { name: "الرئيسية", href: "/", icon: <Home className="w-4 h-4" /> },
        { name: "تجميعات PC", href: "/#pc", icon: <Monitor className="w-4 h-4" /> },
        { name: "شاشات", href: "/#monitors", icon: <Tv className="w-4 h-4" /> },
        { name: "قطع وإكسسوارات", href: "/#accessories", icon: <Mouse className="w-4 h-4" /> },
        { name: "المقارنة الذكية", href: "/compare", icon: <ArrowRightLeft className="w-4 h-4 text-brand-dark" /> },
    ];

    return (
        <nav className="fixed top-0 inset-x-0 z-50 glass-panel border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Logo" className="h-14 md:h-16 w-auto object-contain" />
                        ) : (
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-light to-brand-dark flex items-center justify-center shadow-lg shadow-brand-light/30">
                                <span className="text-white font-bold text-xl">TC</span>
                            </div>
                        )}
                        <span className="font-bold text-2xl tracking-tight hidden sm:block">
                            <span className="text-gradient">مركز الروان</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-4 lg:gap-8 shrink-0">
                        <div className="flex items-center gap-3 lg:gap-6 shrink-0">
                            {partnerUrl && (
                                <a href={partnerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-brand-light/10 hover:bg-brand-light/20 text-brand-dark font-bold text-sm transition-colors border border-brand-light/20 shadow-sm ml-2 whitespace-nowrap shrink-0">
                                    <Smartphone className="w-5 h-5" />
                                    <span className="whitespace-nowrap">{partnerName || "موقع الهواتف"}</span>
                                </a>
                            )}
                            {navLinks.map((link) => (
                                <NextLink
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-1.5 lg:gap-2 text-slate-600 hover:text-brand-dark transition-colors font-medium relative group whitespace-nowrap shrink-0 text-sm lg:text-base"
                                >
                                    {link.icon}
                                    <span>{link.name}</span>
                                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-brand-light transition-all duration-300 group-hover:w-full"></span>
                                </NextLink>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 lg:gap-4 border-r border-slate-200 pr-3 lg:pr-4 shrink-0">
                            <button
                                onClick={toggleCurrency}
                                className="flex items-center justify-between w-20 h-9 bg-slate-100 rounded-full p-1 relative shadow-inner cursor-pointer"
                            >
                                <div className="absolute inset-y-1 right-1 left-1 flex justify-between z-10 pointers-events-none px-2 items-center text-xs font-bold text-slate-400">
                                    <span className={currency === "IQD" ? "text-slate-800" : ""}>د.ع</span>
                                    <span className={currency === "USD" ? "text-slate-800" : ""}>$</span>
                                </div>
                                <motion.div
                                    className="w-8 h-7 bg-white rounded-full shadow-sm z-0"
                                    animate={{
                                        x: currency === "IQD" ? 0 : -36,
                                    }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                />
                            </button>

                            <button onClick={() => setIsFavoritesOpen(true)} className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-600 transition-colors" title="المفضلات">
                                <Heart className="w-5 h-5" />
                                {totalFavorites > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                        {totalFavorites}
                                    </span>
                                )}
                            </button>

                            <button onClick={() => setIsCartOpen(true)} className="relative flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-brand-light/10 hover:text-brand-dark text-slate-600 transition-colors" title="سلة الشراء">
                                <ShoppingCart className="w-5 h-5" />
                                {totalItems > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-brand-dark text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                                        {totalItems}
                                    </span>
                                )}
                            </button>

                            <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors" title="تسجيل الدخول / لوحة التحكم">
                                <User className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Icons and Mobile Menu */}
                    <div className="flex items-center gap-2 md:hidden">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-slate-600 hover:text-brand-dark p-2"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden glass-panel border-t border-white/20"
                    >
                        <div className="px-4 pt-2 pb-6 space-y-1">
                            {partnerUrl && (
                                <a
                                    href={partnerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-3 rounded-xl bg-brand-light/10 text-brand-dark border border-brand-light/20 hover:bg-brand-light/20 transition-all duration-300 font-bold mb-2"
                                >
                                    <Smartphone className="w-5 h-5 shrink-0 text-brand-dark" />
                                    <span>{partnerName || "موقع الهواتف"}</span>
                                </a>
                            )}

                            {navLinks.map((link) => (
                                <NextLink
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-slate-600 hover:bg-slate-50 hover:text-brand-dark transition-colors"
                                >
                                    {link.icon}
                                    <span className="font-medium">{link.name}</span>
                                </NextLink>
                            ))}

                            <div className="mt-4 pt-4 border-t border-slate-200 flex flex-col gap-4 px-3">
                                <div className="flex items-center justify-between">
                                    <span className="font-medium text-slate-600">تغيير العملة:</span>
                                    <button
                                        onClick={toggleCurrency}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-100/80 rounded-lg font-bold text-brand-dark hover:bg-slate-200 transition-colors"
                                    >
                                        {currency === "IQD" ? "دينار عراقي (IQD)" : "دولار أمريكي (USD)"}
                                    </button>
                                </div>

                                <button
                                    onClick={() => {
                                        setIsMobileMenuOpen(false);
                                        setIsCartOpen(true);
                                    }}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-brand-dark text-white rounded-xl font-bold hover:bg-brand-light transition-colors w-full shadow-md"
                                >
                                    <ShoppingCart className="w-5 h-5" />
                                    سلة المشتريات ({totalItems})
                                </button>

                                <div className="grid grid-cols-2 gap-3">
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setIsFavoritesOpen(true);
                                        }}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-red-50 hover:text-red-500 transition-colors w-full"
                                    >
                                        <Heart className="w-5 h-5" />
                                        المفضلات ({totalFavorites})
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsMobileMenuOpen(false);
                                            setIsLoginModalOpen(true);
                                        }}
                                        className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors w-full shadow-md"
                                    >
                                        <User className="w-5 h-5" />
                                        لوحة التحكم
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </nav>
    );
}
