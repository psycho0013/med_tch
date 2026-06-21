"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Product } from "@/lib/types";

interface FavoritesContextType {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
    clearFavorites: () => void;
    totalFavorites: number;
    isFavoritesOpen: boolean;
    setIsFavoritesOpen: (isOpen: boolean) => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Product[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);

    // Load from local storage
    useEffect(() => {
        const savedFavorites = localStorage.getItem("Al-RwanCenter_favorites");
        if (savedFavorites) {
            try {
                setFavorites(JSON.parse(savedFavorites));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("Al-RwanCenter_favorites", JSON.stringify(favorites));
        }
    }, [favorites, isLoaded]);

    const addToFavorites = (product: Product) => {
        setFavorites((prev) => {
            if (prev.find((p) => p.id === product.id)) return prev;
            return [...prev, product];
        });
        setIsFavoritesOpen(true); // Open drawer on add
    };

    const removeFromFavorites = (productId: string) => {
        setFavorites((prev) => prev.filter((p) => p.id !== productId));
    };

    const isFavorite = (productId: string) => {
        return favorites.some((p) => p.id === productId);
    };

    const clearFavorites = () => {
        setFavorites([]);
    };

    const totalFavorites = favorites.length;

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites, isFavorite, clearFavorites, totalFavorites, isFavoritesOpen, setIsFavoritesOpen }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error("useFavorites must be used within a FavoritesProvider");
    }
    return context;
}
