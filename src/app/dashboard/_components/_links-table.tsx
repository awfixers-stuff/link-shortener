"use client";

import {
  Table,
  TableBody,
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
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
import { trpc } from "@/app/server/trpc/client";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

export function LinksDataTable({ links }: { links: any[] }) {
  const { refetch, data: session } = authClient.useSession();
  const router = useRouter();
  const utils = trpc.useUtils();
  const deleteLink = trpc.links.deleteLink.useMutation();
  const [deletingKey, setDeletingKey] = useState<string | null>(null);

  if (!session || !session.user) {
    redirect("/auth/sign-in?ref=/dashboard");
  }

  const handleDelete = async (key: string) => {
    setDeletingKey(key);
    try {
      await deleteLink.mutateAsync({ key, userId: session.user.id });
      toast.success("Link deleted");
      utils.links.getLinksByUserId.invalidate({ userId: session.user.id });
      router.refresh();
      refetch();
    } catch (e: any) {
      toast.error(e?.message || "Failed to delete link");
    } finally {
      setDeletingKey(null);
    }
  };

  return (
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
        {links.map((link) => (
          <TableRow key={link.id}>
            <TableCell>
              <Link href={`${env.NEXT_PUBLIC_APP_URL}/${link.key}`}>
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
                  <Button variant="ghost" size="icon" className="size-8 p-0">
                    <MoreVerticalIcon className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Button
                      className="text-destructive focus:text-destructive"
                      onClick={() => handleDelete(link.key)}
                      disabled={
                        deletingKey === link.key || deleteLink.isPending
                      }
                    >
                      <Trash2Icon className="mr-1 size-4" />
                      {deletingKey === link.key ? "Deleting..." : "Delete"}
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
