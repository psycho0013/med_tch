import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyContext";
import { CartProvider } from "@/lib/CartContext";
import { FavoritesProvider } from "@/lib/FavoritesContext";
import { ToastProvider } from "@/lib/ToastContext";
import CartDrawer from "@/components/CartDrawer";
import FavoritesDrawer from "@/components/FavoritesDrawer";
import Preloader from "@/components/Preloader";

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: " Al-Rwan Center | قارن، اختار، واشتري قطع البي سي بذكاء",
  description: "المنصة رقم 1 في العراق لمقارنة تجميعات الـ PC، الشاشات، وقطع وإكسسوارات الألعاب.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <body className={`${cairo.variable} font-sans antialiased bg-[#050505] text-white`} suppressHydrationWarning>
        <CurrencyProvider>
          <CartProvider>
            <FavoritesProvider>
              <ToastProvider>
                <Preloader />
                {children}
                <CartDrawer />
                <FavoritesDrawer />
              </ToastProvider>
            </FavoritesProvider>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
