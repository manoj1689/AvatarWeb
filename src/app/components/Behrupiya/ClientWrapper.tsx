// src/components/ClientWrapper.tsx

"use client"; // Ensures this is a Client Component

import { SessionProvider } from "next-auth/react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
