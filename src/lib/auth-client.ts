import { createAuthClient } from "better-auth/react";
import { env } from "./env";
import {
  inferAdditionalFields,
  usernameClient,
} from "better-auth/client/plugins";
import { auth } from "./auth";
import { stripeClient } from "@better-auth/stripe/client";

export const authClient = createAuthClient({
  baseURL: `${env.NEXT_PUBLIC_APP_URL}/server/api/auth`,
  plugins: [
    inferAdditionalFields<typeof auth>(),
    usernameClient(),
    stripeClient({ subscription: true }),
  ],
});
