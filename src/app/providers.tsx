"use client";
import { SessionProvider, signIn } from "next-auth/react";

// create session provider
export const Providers = () => {
  return (
    <SessionProvider>
      Test sign in
      <button
        onClick={async () => {
          await signIn();
        }}
      >
        Sign in
      </button>
    </SessionProvider>
  );
};
