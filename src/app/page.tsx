'use client'
import HomePage from "./home/page";
import { useEffect } from "react";
import Script from "next/script";

export default function Home() {
  useEffect(() => {
    // Initialize Google Ads after the script is loaded
    const initAds = () => {
      if (window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    };

    // Set up a timeout to ensure the script has loaded
    const timer = setTimeout(initAds, 1000);

    return () => clearTimeout(timer);
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
          // Initialize ads when the script loads
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }}
        onError={(e) => console.error('Adsense script failed to load', e)}
      />
      <ins className="adsbygoogle"
           style={{ display: "block" ,backgroundColor:'orange' }}
           data-ad-client="ca-pub-5586423585632688"  // Replace with your AdSense Client ID
           data-ad-slot="5043688208"  // Replace with your AdSense Slot ID
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
           <HomePage />
    </>
    
  );
}

