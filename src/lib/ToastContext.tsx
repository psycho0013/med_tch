"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Info, X } from "lucide-react";

export type ToastType = "success" | "error" | "info";

export interface ToastMessage {
    id: string;
    type: ToastType;
    message: string;
}

interface ToastContextType {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const addToast = useCallback((type: ToastType, message: string) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, type, message }]);

        // Auto remove after 4 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    const success = useCallback((msg: string) => addToast("success", msg), [addToast]);
    const error = useCallback((msg: string) => addToast("error", msg), [addToast]);
    const info = useCallback((msg: string) => addToast("info", msg), [addToast]);

    return (
        <ToastContext.Provider value={{ success, error, info }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[99999] flex flex-col gap-2 pointer-events-none items-center">
                <AnimatePresence mode="popLayout">
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            layout
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            className="pointer-events-auto flex items-center gap-3 px-5 py-3.5 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl min-w-[300px] max-w-[90vw]"
                        >
                            {toast.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                            {toast.type === "error" && <XCircle className="w-5 h-5 text-red-500 shrink-0" />}
                            {toast.type === "info" && <Info className="w-5 h-5 text-blue-500 shrink-0" />}
                            
                            <p className="text-white text-sm font-bold m-0 flex-1">{toast.message}</p>
                            
                            <button 
                                onClick={() => removeToast(toast.id)}
                                className="text-zinc-500 hover:text-white transition-colors shrink-0 p-1"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}
