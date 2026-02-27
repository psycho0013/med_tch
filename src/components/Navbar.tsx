"use client";

import { useState } from "react";
import { default as NextLink } from "next/link";
import { Menu, X, Smartphone, Laptop, Zap, User, Apple, Monitor, Tv, Mouse } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LoginModal from "./LoginModal";
import { useCurrency } from "./CurrencyContext";

export default function Navbar() {
    const { currency, setCurrency } = useCurrency();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const toggleCurrency = () => {
        setCurrency(currency === "IQD" ? "USD" : "IQD");
    };

    const navLinks = [
        { name: "أندرويد", href: "#android", icon: <Smartphone className="w-4 h-4" /> },
        { name: "أبل", href: "#ios", icon: <Apple className="w-4 h-4" /> },
        { name: "لابتوبات", href: "#laptops", icon: <Laptop className="w-4 h-4" /> },
        { name: "تجميعات PC", href: "#pc", icon: <Monitor className="w-4 h-4" /> },
        { name: "شاشات", href: "#monitors", icon: <Tv className="w-4 h-4" /> },
        { name: "قطع وإكسسوارات", href: "#accessories", icon: <Mouse className="w-4 h-4" /> },
        { name: "العروض", href: "#offers", icon: <Zap className="w-4 h-4" /> },
    ];

    return (
        <nav className="fixed top-0 inset-x-0 z-50 glass-panel border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-light to-brand-dark flex items-center justify-center shadow-lg shadow-brand-light/30">
                            <span className="text-white font-bold text-xl">TC</span>
                        </div>
                        <span className="font-bold text-2xl tracking-tight">
                            تك<span className="text-gradient">كومبير</span>
                        </span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-8">
                        <div className="flex items-center gap-6">
                            {navLinks.map((link) => (
                                <NextLink
                                    key={link.name}
                                    href={link.href}
                                    className="flex items-center gap-2 text-slate-600 hover:text-brand-dark transition-colors font-medium relative group"
                                >
                                    {link.icon}
                                    {link.name}
                                    <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-brand-light transition-all duration-300 group-hover:w-full"></span>
                                </NextLink>
                            ))}
                        </div>

                        <div className="flex items-center gap-4 border-r border-slate-200 pr-4">
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

                            <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 hover:bg-brand-dark hover:text-white text-slate-600 transition-colors" title="تسجيل الدخول / لوحة التحكم">
                                <User className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile menu button */}
                    <div className="flex items-center md:hidden">
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
                                        setIsLoginModalOpen(true);
                                    }}
                                    className="flex items-center justify-center gap-2 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors w-full shadow-md"
                                >
                                    <User className="w-5 h-5" />
                                    تسجيل الدخول / لوحة التحكم
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
        </nav>
    );
}
