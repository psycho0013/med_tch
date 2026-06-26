"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Prevent scrolling while loading
        document.body.style.overflow = "hidden";
        
        const timer = setTimeout(() => {
            setIsLoading(false);
            document.body.style.overflow = "unset";
        }, 1500); // 1.5s is perfect for a premium feel without being annoying

        return () => {
            clearTimeout(timer);
            document.body.style.overflow = "unset";
        };
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="fixed inset-0 z-[999999] bg-[#050505] flex items-center justify-center"
                >
                    <div className="relative flex flex-col items-center justify-center">
                        {/* Glow behind the logo */}
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="absolute w-32 h-32 bg-brand-light/20 blur-[50px] rounded-full"
                        />
                        
                        {/* The Text Logo */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                            className="text-4xl font-black tracking-tighter text-white relative z-10 flex items-center gap-1"
                        >
                            <span className="text-brand-light">Al-RwanPC</span>
                        </motion.div>

                        {/* Loading Line */}
                        <motion.div 
                            className="h-[2px] bg-brand-light mt-6 rounded-full"
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 100, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
