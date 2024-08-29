import React from "react";
import Script from "next/script";
import "../../globals.css";



const AdSence = () => {
  return (
    <Script
      id="adsense-script"
      strategy="afterInteractive"
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5586423585632688"
      async
      crossOrigin="anonymous"
      onLoad={() => {
        console.log('Adsense script loaded successfully');
      
      }}
      onError={(e) => console.error('Adsense script failed to load', e)}
    />
  );
};

export default AdSence;
