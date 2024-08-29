'use client'
// pages/index.js or pages/index.tsx
import HomePage from "./home/page";
import AdsenseScript from "./components/AdsenseScript/page";
export default function Home() {
 
  return (

    <>
      <HomePage />
      <AdsenseScript/>
      {/* Your ad code goes here */}
      <ins className="adsbygoogle"
           style={{ display: "block" }}
           data-ad-client="ca-pub-5586423585632688"
           data-ad-slot="5043688208"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>
    </>
  );
}
