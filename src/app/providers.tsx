"use client";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { CalendarView } from "./calendar";

// create session provider
export const Providers = () => {
  return (
    <SessionProvider>
      Test sign in
      <button
        onClick={async () => {
          await signIn("Withings");
        }}
      >
        Sign in
      </button>

      <CalendarView />
    </SessionProvider>
  );
};
