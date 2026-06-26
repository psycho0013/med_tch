"use client";

import { motion } from "framer-motion";

const brands = [
    "NVIDIA", "AMD", "INTEL", "ASUS", "MSI", "GIGABYTE", "CORSAIR", "NZXT", "RAZER", "LOGITECH", "HYPERX", "STEELSERIES"
];

export default function BrandsMarquee() {
    return (
        <div className="w-full bg-[#030303] py-8 border-y border-white/5 overflow-hidden flex flex-col items-center justify-center relative">
            {/* Gradient masks for smooth fade effect on edges */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#030303] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#030303] to-transparent z-10" />
            
            <div dir="ltr" className="w-full overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)]">
                <motion.div
                    className="flex items-center w-max"
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                >
                    {[...brands, ...brands, ...brands, ...brands].map((brand, i) => (
                        <div key={i} className="mx-8 lg:mx-16 flex items-center justify-center shrink-0">
                            <span className="text-2xl md:text-4xl font-black text-white/20 hover:text-white/60 transition-colors tracking-widest cursor-default">
                                {brand}
                            </span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
}
