import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { trpc } from "../server/trpc/server";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { env } from "@/lib/env";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVerticalIcon, Trash2Icon } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user) {
    redirect("/auth/sign-in?ref=/dashboard");
  }

  const data = await trpc.links.getLinksByUserId({ userId: session.user.id });

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="auto-rows min grid gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl px-4 py-2 md:min-h-min">
        {data?.links ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="">URL</TableHead>
                <TableHead>Source</TableHead>
                <TableHead># of Visits</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.links.map((link) => (
                <TableRow key={link.id}>
                  <TableCell>
                    <Link href={`${env.BETTER_AUTH_URL}/${link.key}`}>
                      {link.key}
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Link href={link.destination}>{link.destination}</Link>
                  </TableCell>
                  <TableCell>{link.visits}</TableCell>
                  <TableCell>{link.createdAt}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                        link.status === "online"
                          ? "bg-green-300 text-green-700 dark:bg-green-700/20 dark:text-green-500"
                          : "bg-red-300 text-red-700 dark:bg-red-700/20 dark:text-red-500",
                      )}
                    >
                      {link.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 p-0"
                        >
                          <MoreVerticalIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2Icon className="mr-1 size-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <span>
            No Shortened URLs found. Start by creating your first shortened link
          </span>
        )}
      </div>
    </div>
  );
}
