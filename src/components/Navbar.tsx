"use client";

import { useState, useEffect } from "react";
import { default as NextLink } from "next/link";
import { Menu, X, User, ShoppingCart, Search, Smartphone, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCurrency } from "./CurrencyContext";
import { useCart } from "@/lib/CartContext";
import { useFavorites } from "@/lib/FavoritesContext";
import SearchModal from "./SearchModal";

export default function Navbar() {
    const { currency, setCurrency } = useCurrency();
    const { totalItems, setIsCartOpen } = useCart();
    const { totalFavorites, setIsFavoritesOpen } = useFavorites();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [partnerName, setPartnerName] = useState("");
    const [partnerUrl, setPartnerUrl] = useState("");
    const [isScrolled, setIsScrolled] = useState(false);

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

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleCurrency = () => {
        setCurrency(currency === "IQD" ? "USD" : "IQD");
    };

    const navLinks = [
        { name: "الرئيسية", href: "/" },
        { name: "تجميعات PC", href: "/#pc" },
        { name: "شاشات", href: "/#monitors" },
        { name: "قطع وإكسسوارات", href: "/#accessories" },
        { name: "خدمات الصيانة", href: "/maintenance" },
    ];

    return (
        <>
        <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-[#050505]/95 backdrop-blur-md border-b border-white/5' : 'bg-transparent border-transparent'}`}>
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex justify-between items-center transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
                    {/* Logo */}
                    <div className="flex-shrink-0 flex flex-col justify-center cursor-pointer">
                        {logoUrl ? (
                            <img src={logoUrl} alt="Logo" className="h-14 md:h-16 w-auto object-contain brightness-0 invert drop-shadow-lg" />
                        ) : (
                            <>
                                <span className="font-black text-2xl tracking-tighter text-white leading-none">Al-Rwan<span className="text-brand-light">Pc</span></span>
                                <span className="text-[10px] text-zinc-400 font-medium">مركز الروان</span>
                            </>
                        )}
                    </div>

                    {/* Desktop Nav Links */}
                    <div className="hidden md:flex items-center justify-center gap-8 flex-1 px-8">
                        {navLinks.map((link) => (
                            <NextLink
                                key={link.name}
                                href={link.href}
                                className="text-zinc-300 hover:text-white transition-colors font-medium relative group text-[15px]"
                            >
                                <span>{link.name}</span>
                                <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
                            </NextLink>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="hidden md:flex items-center gap-6 shrink-0">
                        {partnerUrl && (
                            <a href={partnerUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/20 hover:bg-white/10 text-white font-medium text-sm transition-colors ml-2 whitespace-nowrap shrink-0">
                                <Smartphone className="w-4 h-4" />
                                <span>{partnerName || "موقع الهواتف"}</span>
                            </a>
                        )}

                        <button
                            onClick={toggleCurrency}
                            className="text-xs font-bold text-zinc-400 hover:text-white transition-colors border border-white/10 px-2 py-1 rounded-md"
                        >
                            {currency === "IQD" ? "IQD" : "USD"}
                        </button>

                        <button onClick={() => setIsSearchOpen(true)} className="text-zinc-300 hover:text-white transition-colors">
                            <Search className="w-[22px] h-[22px]" strokeWidth={1.5} />
                        </button>

                        <button onClick={() => setIsFavoritesOpen(true)} className="relative text-zinc-300 hover:text-white transition-colors">
                            <Heart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                            {totalFavorites > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md shadow-red-500/20">
                                    {totalFavorites}
                                </span>
                            )}
                        </button>

                        <NextLink href="/admin/login" className="text-zinc-300 hover:text-white transition-colors">
                            <User className="w-[22px] h-[22px]" strokeWidth={1.5} />
                        </NextLink>

                        <button onClick={() => setIsCartOpen(true)} className="relative text-zinc-300 hover:text-white transition-colors">
                            <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <button onClick={() => setIsSearchOpen(true)} className="text-zinc-300 hover:text-white transition-colors">
                            <Search className="w-[22px] h-[22px]" strokeWidth={1.5} />
                        </button>
                        <button onClick={() => setIsFavoritesOpen(true)} className="relative text-zinc-300 hover:text-white transition-colors">
                            <Heart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                            {totalFavorites > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-md shadow-red-500/20">
                                    {totalFavorites}
                                </span>
                            )}
                        </button>
                        <button onClick={() => setIsCartOpen(true)} className="relative text-zinc-300">
                            <ShoppingCart className="w-[22px] h-[22px]" strokeWidth={1.5} />
                            {totalItems > 0 && (
                                <span className="absolute -top-1.5 -right-1.5 bg-white text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </button>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-zinc-300 hover:text-white"
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
                        className="md:hidden bg-[#050505] border-t border-white/5"
                    >
                        <div className="px-4 pt-4 pb-6 space-y-2">
                            {partnerUrl && (
                                <a
                                    href={partnerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors mb-2"
                                >
                                    <Smartphone className="w-5 h-5 text-zinc-300" />
                                    <span>{partnerName || "موقع الهواتف"}</span>
                                </a>
                            )}
                            {navLinks.map((link) => (
                                <NextLink
                                    key={link.name}
                                    href={link.href}
                                    className="block px-3 py-3 rounded-xl text-zinc-400 hover:bg-white/5 hover:text-white transition-colors font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </NextLink>
                            ))}

                            <div className="mt-4 pt-4 border-t border-white/5 grid grid-cols-2 gap-3">
                                <button
                                    onClick={toggleCurrency}
                                    className="flex items-center justify-center px-4 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
                                >
                                    {currency === "IQD" ? "IQD" : "USD"}
                                </button>
                                <NextLink
                                    href="/admin/login"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-center px-4 py-3 bg-white/5 text-white rounded-xl font-medium hover:bg-white/10 transition-colors"
                                >
                                    حسابي
                                </NextLink>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </nav>
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
}

