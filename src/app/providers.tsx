"use client";
import { SessionProvider } from "next-auth/react";
import { CalendarView } from "./calendar";

// create session provider
export const Providers = () => {
  return (
    <SessionProvider>
      <CalendarView />
    </SessionProvider>
  );
};
