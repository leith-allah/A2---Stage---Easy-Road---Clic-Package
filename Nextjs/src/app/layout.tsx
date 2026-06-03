
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

import {WalletProvider} from "@/providers/WalletProvider";

import {NotificationProvider} from "@/providers/NotificationProvider";

import {BookingProvider} from "@/providers/BookingProvider";

import {TransactionProvider} from "@/providers/TransactionProvider";

import {PackageProvider} from "@/providers/PackageProvider";

import {AuthProvider} from "@/providers/AuthProvider";

import RoleSwitcher from "@/components/dev/RoleSwitcher";

import {Toaster} from "sonner";

import {LoadingProvider} from "@/providers/LoadingProvider";

import GlobalLoader from "@/components/ui/GlobalLoader";


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
        {/* <Header /> */}

        <main className="flex-1 p-6">
            <LoadingProvider>
              <AuthProvider>
                <WalletProvider>
                  <NotificationProvider>
                    <BookingProvider>
                      <TransactionProvider>
                        <PackageProvider>
                          {children}
                          {/* <RoleSwitcher /> */}
                        </PackageProvider>
                      </TransactionProvider>
                    </BookingProvider>
                  </NotificationProvider>
                </WalletProvider>
              </AuthProvider>
            </LoadingProvider>
          <Toaster
            position="top-right"
            richColors
          />
        </main>

        {/* <Footer /> */}
      </body>
    </html>
  );
}
