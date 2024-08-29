import "../styles/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ClientWrapper from "../app/components/Behrupiya/ClientWrapper";
import AdSence from "../app/components/Adsense/page"; // Adjust the import path to match your project structure
import Script from "next/script";

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
        <Script
          id="adsense-script"
          strategy="afterInteractive"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
          async
          crossOrigin="anonymous"
        />
      </head>
      <body className={`bg-gray-100 ${inter.className}`}>
        <ClientWrapper>
          {children}
        </ClientWrapper>
      </body>
    </html>
  );
}
