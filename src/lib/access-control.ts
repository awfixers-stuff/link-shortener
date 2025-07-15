"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

export const getUserLimits = async () => {
  try {
    const subscriptions = await auth.api.listActiveSubscriptions({
      headers: await headers(),
    });
    const activeSub = subscriptions?.find((sub) => sub.status === "active");

    const links = activeSub?.limits?.links ?? 5;
    const analytics = activeSub?.limits?.analytics ?? 1;

    return { links, analytics };
  } catch (err) {
    console.error("[ERROR] Fetching User Limits", err);
    return { links: 5, analytics: 1 };
  }
};
