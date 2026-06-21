"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Currency = "IQD" | "USD";

interface CurrencyContextType {
    currency: Currency;
    setCurrency: (currency: Currency) => void;
    exchangeRate: number;
    formatPrice: (usdPrice: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export function CurrencyProvider({ children }: { children: ReactNode }) {
    const [currency, setCurrency] = useState<Currency>("IQD");
    const [exchangeRate, setExchangeRate] = useState<number>(1500); // Default to 1500

    useEffect(() => {
        // Fetch the current exchange rate from settings
        fetch("/api/settings")
            .then((res) => res.json())
            .then((data) => {
                if (data && data.exchange_rate) {
                    setExchangeRate(data.exchange_rate);
                }
            })
            .catch((err) => console.error("Failed to load exchange rate:", err));
    }, []);

    // Format utility
    const formatPrice = (usdPrice: number) => {
        if (currency === "USD") {
            return `$${usdPrice.toLocaleString()}`;
        }

        // IQD format
        const iqdPrice = usdPrice * (exchangeRate / 100);
        return `${iqdPrice.toLocaleString()} د.ع`;
    };

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, exchangeRate, formatPrice }}>
            {children}
        </CurrencyContext.Provider>
    );
}

export function useCurrency() {
    const context = useContext(CurrencyContext);
    if (!context) {
        throw new Error("useCurrency must be used within a CurrencyProvider");
    }
    return context;
}
