"use client";

import { getUserLimits } from "@/lib/access-control";
import { LinksDataTable } from "./_components/_links-table";
import { useDashboardSession } from "@/providers/dashboard-session-provider";
import { trpc } from "../server/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function DashboardPage() {
  const session = useDashboardSession();
  const { data: links, isLoading: isLoadingLinks } =
    trpc.links.getLinksByUserId.useQuery({
      userId: session.user.id,
    });

  const { data: limits, isLoading: isLoadingLimits } = useQuery({
    queryKey: ["user-limits"],
    queryFn: getUserLimits,
  });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {isLoadingLimits ? (
        <div className="auto-rows min grid gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
      ) : (
        limits &&
        limits.analytics !== 1 && (
          <div className="auto-rows min grid gap-4 md:grid-cols-3">
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
            <div className="bg-muted/50 aspect-video rounded-xl" />
          </div>
        )
      )}
      {isLoadingLinks ? (
        <div className="bg-muted/50 min-h-[100vh] flex-1 animate-pulse rounded-xl px-4 py-2 md:min-h-min" />
      ) : (
        <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl px-4 py-2 md:min-h-min">
          {links ? (
            <LinksDataTable links={links.links} />
          ) : (
            <span>
              No Shortened URLs found. Start by creating your first shortened
              link
            </span>
          )}
        </div>
      )}
    </div>
  );
}
