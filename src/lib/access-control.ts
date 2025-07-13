import { authClient } from "./auth-client";

export const getUserLimits = async () => {
  const { data: subscriptions } = await authClient.subscription.list();
  const activeSub = subscriptions?.find((sub) => sub.status === "active");
  const links = activeSub?.limits?.links ?? 5;
  const analytics = activeSub?.limits?.analytics ?? 1;

  return { links, analytics };
};
