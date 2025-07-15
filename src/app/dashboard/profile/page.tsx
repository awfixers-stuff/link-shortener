import { headers } from "next/headers";
import { ProfilePage } from "./_components/profile";
import { auth } from "@/lib/auth";

export default async function DashboardProfilePage() {
  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  });
  const activeSubscription = subscriptions?.find(
    (sub) => sub.status === "active",
  );

  const data =
    activeSubscription?.plan &&
    activeSubscription?.periodEnd &&
    activeSubscription?.stripeSubscriptionId
      ? {
          plan: activeSubscription.plan,
          periodEnd: activeSubscription.periodEnd,
          stripeSubscriptionId: activeSubscription.stripeSubscriptionId,
        }
      : undefined;

  return <ProfilePage subscription={data} />;
}
