"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useDashboardSession } from "@/providers/dashboard-session-provider";
import { DynamicBreadcrumb } from "./_dynamic-breadcrumb";
import { CreateLinkCTA } from "./_cta";

export function DashboardHeader() {
  const session = useDashboardSession();
  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-2 border-b px-4">
      <div className="flex h-full items-center gap-2">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <DynamicBreadcrumb />
      </div>
      <CreateLinkCTA userId={session.user.id} />
    </header>
  );
}
