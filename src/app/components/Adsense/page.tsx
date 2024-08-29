import React from "react";
import Script from "next/script";
import "../../globals.css"

type AdsenseType = {
    pId:string
}

const AdSence=({pId}:AdsenseType)=>{
return (
    <Script
    id="adsense-script"
    strategy="afterInteractive"
    src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
    async
    crossOrigin="anonymous"
    onLoad={() => {
      console.log('Adsense script loaded successfully');
    }}
    onError={(e) => console.error('Adsense script failed to load', e)}
  />
)
}

export default AdSence;