import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";

import "./globals.css";
import ReactQueryProvider from "@/providers/tanstackProvider";
import { Toaster } from "@/components/ui/toaster";
import TheHeader from "@/components/header/TheHeader";
import NextAuthProvider from "./providers/nextAuthProvider";
import TheFooter from "@/components/footer/TheFooter";

export const metadata: Metadata = {
  title: "Bookely",
  description: "An app that provides easy to use bookings for businesses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <NextAuthProvider>
          <ReactQueryProvider>
            <TheHeader />
            {children} <Toaster />
            <TheFooter />
          </ReactQueryProvider>
        </NextAuthProvider>
      </body>
    </html>
  );
}
