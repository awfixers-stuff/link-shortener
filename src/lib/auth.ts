import { betterAuth } from "better-auth";
import { env } from "./env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { openAPI, username, haveIBeenPwned, admin } from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import Stripe from "stripe";
import { stripe } from "@better-auth/stripe";

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-06-30.basil",
});

export const auth = betterAuth({
  appName: "AWFixer Links",
  baseURL: env.NEXT_PUBLIC_APP_URL as string,
  basePath: "/server/api/auth",
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
    autoSignIn: true,
    async sendResetPassword(data, request) {
      // TODO: Add RESEND or alternative
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    expiresIn: 600,
  },
  user: {
    additionalFields: {
      newsletter: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      links: {
        type: "number",
        required: false,
        defaultValue: 0,
        input: false,
      },
      analytics: {
        type: "string",
        required: false,
        defaultValue: "basic",
        input: false,
      },
    },
  },
  account: {
    accountLinking: {
      enabled: true,
      allowDifferentEmails: false,
      updateUserInfoOnLink: false,
      allowUnlinkingAll: false,
      trustedProviders: [
        "github",
        "google",
        "discord",
        "apple",
        "email-password",
      ],
    },
  },
  session: {
    cookieCache: {
      enabled: false,
      maxAge: 5 * 60,
    },
  },
  plugins: [
    admin(),
    openAPI(),
    username({ minUsernameLength: 5 }),
    nextCookies(),
    haveIBeenPwned({
      customPasswordCompromisedMessage:
        "Password has been found in a security breach. Please choose a more secure password.",
    }),
    stripe({
      stripeClient,
      stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET!,
      createCustomerOnSignUp: true,
      subscription: {
        enabled: true,
        plans: [
          {
            name: "free",
            priceId: "price_1RjtffRtO1V0nNQXevaCCUiD",
            limit: { links: 5, analytics: "basic" },
          },
        ],
      },
    }),
  ],
  advanced: {
    cookiePrefix: "awfixer",
  },
  trustedOrigins: [env.NEXT_PUBLIC_APP_URL],
  logger: {
    disabled: false,
    level: "debug",
    log: (level, message, ...args) => {
      console.log(
        `[BETTER-AUTH] [${level.toUpperCase()}]: ${message}`,
        ...args,
      );
    },
  },
});
