import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { trpc } from "../server/trpc/server";
import { LinksTable } from "@/lib/types/database";
import { getUserLimits } from "@/lib/access-control";
import { LinksDataTable } from "./_components/_links-table";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user) {
    redirect("/auth/sign-in?ref=/dashboard");
  }

  const data = await trpc.links.getLinksByUserId({ userId: session.user.id });
  const { analytics } = await getUserLimits();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {analytics !== 1 && (
        <div className="auto-rows min grid gap-4 md:grid-cols-3">
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
          <div className="bg-muted/50 aspect-video rounded-xl" />
        </div>
      )}
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl px-4 py-2 md:min-h-min">
        {data?.links ? (
          <LinksDataTable links={data.links} />
        ) : (
          <span>
            No Shortened URLs found. Start by creating your first shortened link
          </span>
        )}
      </div>
    </div>
  );
}
