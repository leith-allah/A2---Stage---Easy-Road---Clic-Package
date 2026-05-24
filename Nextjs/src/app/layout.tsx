
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Header from "@/src/components/layout/Header";
import Footer from "@/src/components/layout/Footer";

import {WalletProvider} from "@/src/providers/WalletProvider";

import {NotificationProvider} from "@/src/providers/NotificationProvider";

import {BookingProvider} from "@/src/providers/BookingProvider";

import {TransactionProvider} from "@/src/providers/TransactionProvider";

import {PackageProvider} from "@/src/providers/PackageProvider";

import {AuthProvider} from "@/src/providers/AuthProvider";

import RoleSwitcher from "@/src/components/dev/RoleSwitcher";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clic Package",
  description: "Plateforme de réservation Clic Package",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`
        ${geistSans.variable}
        ${geistMono.variable}
        h-full
        antialiased
      `}
    >

      <body className="min-h-full flex flex-col">
        <Header />

        <main className="flex-1 p-6">
          <AuthProvider>
            <WalletProvider>
              <NotificationProvider>
                <BookingProvider>
                  <TransactionProvider>
                    <PackageProvider>
                      {children}
                      <RoleSwitcher />
                    </PackageProvider>
                  </TransactionProvider>
                </BookingProvider>
              </NotificationProvider>
            </WalletProvider>
          </AuthProvider>
        </main>

        <Footer />
      </body>
    </html>
  );
}
