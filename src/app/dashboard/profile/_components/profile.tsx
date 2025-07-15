"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserLimitsProgress } from "../../_components/_user-limits";
import { KeyboardShortcuts } from "./_keyboard-shortcuts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AccountTab } from "./_account-tab";
import { CustomizationTab } from "./_customization-tab";
import { useDashboardSession } from "@/providers/dashboard-session-provider";

export function ProfilePage({
  subscription,
}: {
  subscription:
    | { plan: string; periodEnd: Date; stripeSubscriptionId: string }
    | undefined;
}) {
  const session = useDashboardSession();

  return (
    <div className="flex min-h-[80vh] w-full flex-row gap-8 p-6">
      {/* Sidebar */}
      <aside className="flex w-80 flex-col gap-6 border-r pr-6">
        {/* Logo and User Info */}
        <div className="flex flex-col items-center gap-2">
          <Avatar className="size-24">
            <AvatarImage
              src={session.user.image ?? ""}
              alt={session.user.name}
            />
            <AvatarFallback>{session?.user.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="mt-2 text-lg font-semibold">{session.user.name}</div>
          <div className="text-muted-foreground text-sm">
            {session.user.email} | {session.user.displayUsername}
          </div>
          <span className="mt-2 rounded-full bg-purple-100 px-3 py-1 text-xs font-semibold text-purple-700">
            {subscription
              ? subscription.plan.charAt(0).toUpperCase() +
                subscription.plan.slice(1)
              : "Free"}
          </span>
        </div>
        {/* Message Usage */}
        <div className="flex flex-col gap-2">
          <div className="text-sm font-medium">Plan Usage</div>
          {subscription && (
            <div className="text-muted-foreground text-xs">
              Resets{" "}
              {subscription && subscription.periodEnd?.toLocaleDateString()}
            </div>
          )}
          <UserLimitsProgress inSidebar={false} />
        </div>
        {/* Keyboard Shortcuts */}
        <KeyboardShortcuts />
      </aside>
      {/* Main Content */}
      <main className="flex-1">
        {/* Tabs */}
        <Tabs defaultValue="account">
          <TabsList className="mb-4 w-full">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="customization">Customization</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="contact-us">Contact Us</TabsTrigger>
          </TabsList>
          <AccountTab subscription={subscription} />
          <CustomizationTab />
        </Tabs>
      </main>
    </div>
  );
}
