"use client";

import { useSidebar } from "@/components/ui/sidebar";
import { Progress } from "@/components/ui/progress";
import { authClient } from "@/lib/auth-client";
import { useQuery } from "@tanstack/react-query";
import { getUserLimits } from "@/lib/access-control";

export function UserLimitsProgress({ inSidebar }: { inSidebar: boolean }) {
  const { state } = useSidebar();
  const { data: session } = authClient.useSession();
  const { data: limits, isLoading } = useQuery({
    queryKey: ["user-limits"],
    queryFn: getUserLimits,
  });

  if ((inSidebar && state === "collapsed") || !session?.user) return null;
  if (isLoading || !limits) {
    return (
      <div className="flex flex-col gap-1 px-2 py-2">
        <div className="text-muted-foreground mb-1 flex justify-between text-xs">
          <span>Links Used</span>
          <span>…</span>
        </div>
        <Progress value={0} />
      </div>
    );
  }

  const maxLinks = limits.links;
  const currentLinks = session.user.links ?? 0;
  const percent = Math.min((currentLinks / maxLinks) * 100, 100);
  const atLimit = currentLinks >= maxLinks;

  return (
    <div className="flex flex-col gap-1 px-2 py-2">
      <div className="text-muted-foreground mb-1 flex justify-between text-xs">
        <span>Links Used</span>
        <span>
          {currentLinks} / {maxLinks}
        </span>
      </div>
      <div className={atLimit ? "user-limit-pulse" : "user-limit-normal"}>
        <Progress value={percent} className="bg-indigo-200" />
        <style jsx global>{`
          .user-limit-normal [data-slot="progress-indicator"] {
            background-color: #4f46e5 !important; /* indigo-600 */
            transition: background 0.3s;
          }
          .user-limit-pulse [data-slot="progress-indicator"] {
            background-color: #4f46e5 !important;
            animation: pulse-bg 1s infinite;
          }
          @keyframes pulse-bg {
            0%,
            100% {
              background-color: #4f46e5;
            }
            50% {
              background-color: #a5b4fc;
            }
          }
        `}</style>
      </div>
    </div>
  );
}
