// src/components/GoogleLoginButton.tsx
"use client";

import { signIn, signOut, useSession } from "next-auth/react";

export default function GoogleLoginButton() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-center my-4">
      {!session ? (
        <button
          onClick={() => signIn("google")}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Sign in with Google
        </button>
      ) : (
        <button
          onClick={() => signOut()}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Sign out
        </button>
      )}
    </div>
  );
}
