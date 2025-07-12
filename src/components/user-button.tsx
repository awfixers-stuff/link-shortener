"use client";

import { authClient } from "@/lib/auth-client";
import { redirect, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { LogOutIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useSidebar } from "./ui/sidebar";
import { ThemeSwitcher } from "./theme-switcher";

export function UserButton() {
  const { open } = useSidebar();
  const { data: session } = authClient.useSession();

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess() {
          toast.success("Signed Out successfully", { duration: 600 });
          redirect("/");
        },
      },
    });
  };

  return (
    <div className="flex w-full flex-row gap-1">
      {open && <ThemeSwitcher />}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {open ? (
            <Button
              variant="ghost"
              className="flex flex-1 items-center gap-2 p-2"
            >
              <Avatar className="size-8">
                <AvatarImage
                  src={session?.user.image ?? ""}
                  alt={session?.user.name}
                />
                <AvatarFallback>
                  {session?.user.name.slice(0, 2)}
                </AvatarFallback>
              </Avatar>

              <div className="flex flex-1 flex-col items-start text-sm">
                <span className="font-medium">{session?.user.name}</span>
                <span className="text-muted-foreground text-xs">
                  {session?.user.displayUsername}
                </span>
              </div>
            </Button>
          ) : (
            <Button size="icon" variant="ghost" className="self-center">
              <SettingsIcon className="size-4" />
            </Button>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          hideWhenDetached
          side="right"
          sideOffset={13}
        >
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile">
              <UserIcon className="mr-2 size-4" />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOutIcon className="mr-2 size-4" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
