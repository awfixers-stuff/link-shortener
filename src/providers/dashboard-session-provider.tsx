"use client";

import React, { createContext, useContext } from "react";
import { BetterAuthSession } from "@/lib/types/auth";
import { redirect } from "next/navigation";

const DashboardSessionContext = createContext<BetterAuthSession | null>(null);

export function DashboardSessionProvider({
  session,
  children,
}: {
  session: BetterAuthSession;
  children: React.ReactNode;
}) {
  if (!session) {
    redirect("/auth/sign-in");
  }

  return (
    <DashboardSessionContext.Provider value={session}>
      {children}
    </DashboardSessionContext.Provider>
  );
}

export function useDashboardSession() {
  const context = useContext(DashboardSessionContext);
  if (!context) {
    throw new Error(
      "useDashboardSession must be used within a DashboardSessionProvider",
    );
  }
  return context;
}
