'use client'
import HomePage from "./home/page";
import { useEffect } from "react";
import Script from "next/script";

export default function Home() {
  useEffect(() => {
    try {
      // Ensure Google Ads is initialized after script is loaded
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error('Adsbygoogle push error:', e);
    }
  }, []);

  return (
    <>
    
      {/* Google AdSense script */}
      <Script
        id="adsense-script"
        strategy="afterInteractive"
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
        async
        crossOrigin="anonymous"
        onLoad={() => {
          // Initialize Google Ads
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }}
        onError={(e) => console.error('Adsense script failed to load', e)}
      />
      <ins className="adsbygoogle"
           style={{ display: "block" }}
           data-ad-client="ca-pub-5586423585632688"
           data-ad-slot="5043688208"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
             <HomePage />
    </>
  );
}
