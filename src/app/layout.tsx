import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { CurrencyProvider } from "@/components/CurrencyContext";
import { CartProvider } from "@/lib/CartContext";
import { FavoritesProvider } from "@/lib/FavoritesContext";
import CartDrawer from "@/components/CartDrawer";
import FavoritesDrawer from "@/components/FavoritesDrawer";

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
      <body className={`${cairo.variable} font-sans antialiased bg-slate-50 text-slate-900`} suppressHydrationWarning>
        <CurrencyProvider>
          <CartProvider>
            <FavoritesProvider>
              {children}
              <CartDrawer />
              <FavoritesDrawer />
            </FavoritesProvider>
          </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
