import { headers } from "next/headers";
import { auth } from "./auth";

export const isAdmin = async () => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !session.user) {
    throw new Error("Not Authenticated");
  }

  return session.user.role === "admin";
};
