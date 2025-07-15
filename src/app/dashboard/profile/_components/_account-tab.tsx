"use client";

import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ManageSubButton } from "./_manage-sub";

export function AccountTab({
  subscription,
}: {
  subscription:
    | { stripeSubscriptionId: string; plan: string; periodEnd: Date }
    | undefined;
}) {
  return (
    <TabsContent value="account">
      <div className="bg-background mb-8 rounded-lg border p-6 shadow-sm">
        <div className="mb-4 text-lg font-semibold">Pro Plan Benefits</div>
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="bg-primary text-primary-foreground rounded-md p-4">
            <div className="mb-2 font-medium">Up to 50 Links</div>
            <div className="text-muted text-xs">
              Effortlessly create and manage up to 50 shortened links, perfect
              for sharing and tracking.
            </div>
          </div>
          <div className="bg-primary text-primary-foreground rounded-md p-4">
            <div className="mb-2 font-medium">Enhanced Analytics</div>
            <div className="text-muted text-xs">
              Dive deeper into your data with enhanced analytics, providing
              richer insights into your link performance.
            </div>
          </div>
          <div className="bg-primary text-primary-foreground rounded-md p-4">
            <div className="mb-2 font-medium">Priority Support</div>
            <div className="text-muted text-xs">
              Get faster responses and dedicated assistance from the AW&F team
              whenever you need help!
            </div>
          </div>
        </div>
        <ManageSubButton
          subscriptionId={
            subscription ? subscription.stripeSubscriptionId : null
          }
        />
      </div>
      <div className="bg-background rounded-lg border p-6 shadow-sm">
        <div className="mb-2 text-lg font-semibold text-red-600">
          Danger Zone
        </div>
        <div className="text-muted-foreground mb-4 text-sm">
          Permanently delete your account and all associated data.
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Sorry to see go. We will add this functionality soon.</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </TabsContent>
  );
}
