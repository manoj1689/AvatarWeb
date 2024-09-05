'use client'
import { useEffect } from "react";
import HomePage from "./home/page";

export default function Home() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle push error:", e);
    }
  }, []);

  return (
    <div className="relative w-full h-full">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="fixed top-0 left-0 w-full h-auto z-0"
      >
        <source src="video/background.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="relative z-10 "> 
        <HomePage />
      </div>
      
      {/* Google AdSense Ad Slot */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", backgroundColor: "orange" }}
        data-ad-client="ca-pub-5586423585632688"
        data-ad-slot="5043688208"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
}

