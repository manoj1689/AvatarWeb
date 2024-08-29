'use client'
import { useEffect } from "react";
import HomePage from "./home/page";
//import HomePage from '../app/components/Behrupiya/Home/page';

export default function Home() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("Adsbygoogle push error:", e);
    }
  }, []);
  return (
    <>
       <h1 className="flex mt-40">Welcome to My Website</h1>
      {/* Google AdSense Ad Slot */}
      <ins
        className="adsbygoogle"
        style={{ display: "block", backgroundColor:"orange" }}
        data-ad-client="ca-pub-5586423585632688"
        data-ad-slot="5043688208"
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
     <HomePage/> 
  
    </>

  );
}
