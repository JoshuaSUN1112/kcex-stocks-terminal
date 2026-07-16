import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/components/layout/app-providers";

export const metadata: Metadata = {
  title: "KCEX Stocks (US) Terminal",
  description: "KCEX-style US stocks market dashboard built with Next.js",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-bg text-text antialiased">
        <div className="min-h-screen bg-bg text-text">
          <AppProviders>{children}</AppProviders>
        </div>
      </body>
    </html>
  );
}
