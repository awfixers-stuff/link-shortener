import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect, RedirectType } from "next/navigation";
import React from "react";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [session] = await Promise.all([
    await auth.api.getSession({ headers: await headers() }),
  ]).catch(() => redirect("/auth/sign-in"));

  if (session) {
    redirect("/dashboard", RedirectType.push);
  }

  return <>{children}</>;
}
