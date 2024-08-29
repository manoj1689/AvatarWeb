// src/app/layout.tsx
import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "../app/components/Behrupiya/ClientWrapper";
import AdsenseScript from '../app/components/AdsenseScript/page'
import Script from 'next/script';

// Import and configure the Inter font from Google Fonts
const inter = Inter({ subsets: ["latin"] });

// Define metadata for the document head
export const metadata: Metadata = {
  title: "Avatar Website",
  description: "Made by SmartGrader Team",
};

// RootLayout component, wrapping the application
export default function RootLayout({
  children,
}: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <head>
        {/* Metadata is automatically injected by Next.js */}
      </head>
      <body className={`bg-gray-100 ${inter.className}`}>
        {/* Google AdSense script */}
        <AdsenseScript />
        
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
