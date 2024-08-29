// src/global.d.ts or src/types/global.d.ts
export {};

declare global {
  interface Window {
    adsbygoogle: any[]; // Declare adsbygoogle as an array of any type
  }
}
