"use client";
import { signIn, useSession } from "next-auth/react";

// create session provider
export const CalendarView = () => {
  const session = useSession();

  return session.data ? (
    <pre>{JSON.stringify(session, null, 2)}</pre>
  ) : (
    <button className="bg-blue-600 w-80 p-2" onClick={() => signIn("withings")}>Sign in with Withings.com</button>
  );
};
