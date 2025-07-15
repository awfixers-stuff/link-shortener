import { MobileRedirect } from "@/components/mobile-redirect";
import { DashboardSidebar } from "./_components/_sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies, headers } from "next/headers";
import { SidebarInset } from "@/components/ui/sidebar";
import { DashboardSessionProvider } from "@/providers/dashboard-session-provider";
import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { DashboardHeader } from "./_components/_dashboard-header";

export default async function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user) {
    redirect("/auth/sign-in");
  }

  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("awfixer.sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <DashboardSessionProvider session={session}>
        <MobileRedirect />
        <DashboardSidebar />
        <SidebarInset>
          <DashboardHeader />
          {children}
        </SidebarInset>
      </DashboardSessionProvider>
    </SidebarProvider>
  );
}
