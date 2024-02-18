"use client";
import { useSession } from "next-auth/react";

// create session provider
export const CalendarView = () => {
  const session = useSession();
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
};
