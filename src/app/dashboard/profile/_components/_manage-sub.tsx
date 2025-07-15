"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { env } from "@/lib/env";
import { useRouter } from "next/navigation";

interface Props {
  subscriptionId: string | null;
}

export function ManageSubButton({ subscriptionId }: Props) {
  const router = useRouter();

  const handleButtonClick = async () => {
    if (!subscriptionId) {
      await authClient.subscription.upgrade({
        plan: "pro",
        successUrl: "/dashboard",
        cancelUrl: "/dashboard/profile",
      });
    } else {
      router.push(env.NEXT_PUBLIC_STRIPE_PORTAL_LINK);
    }
  };

  return (
    <Button className="mb-2 w-full max-w-xs" onClick={handleButtonClick}>
      {subscriptionId ? "Manage Subscription" : "Upgrade Now"}
    </Button>
  );
}
