// components/AdsenseScript.tsx
"use client";

import { useEffect } from 'react';
import Script from 'next/script';

const AdsenseScript = () => {
  useEffect(() => {
    if (window.adsbygoogle) {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    }
  }, []);

  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      async
      crossOrigin="anonymous"
      onLoad={() => {
        console.log('Adsense script loaded successfully');
      }}
      onError={(e) => console.error('Adsense script failed to load', e)}
    />
  );
};

export default AdsenseScript;
