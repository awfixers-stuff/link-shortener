import { APIError, betterAuth } from "better-auth";
import { env } from "./env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import {
  openAPI,
  username,
  haveIBeenPwned,
  admin,
  createAuthMiddleware,
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";
import Stripe from "stripe";
import { stripe } from "@better-auth/stripe";
import { resendClient as resend } from "./resend";
import { redisServer as redis } from "./redis";
import { user } from "./db/schema";
import { eq } from "drizzle-orm";
import { emailHarmony } from "better-auth-harmony";

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
  secondaryStorage: {
    get: async (key: string) => {
      const value = await redis.get(key);
      return typeof value === "string"
        ? value
        : value
          ? JSON.stringify(value)
          : null;
    },
    set: async (key: string, value: string, ttl?: number) => {
      if (ttl) await redis.set(key, value, { ex: ttl });
      else await redis.set(key, value);
    },
    delete: async (key: string) => {
      await redis.del(key);
    },
  },
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    async sendResetPassword(data, request) {
      await resend.emails.send({
        from: `AWFixer Links <${env.NEXT_PUBLIC_RESEND_FROM}>`,
        to: data.user.email,
        subject: "Reset your password",
        html: `
          <h2>Reset your password</h2>
          <p>Click the link below to reset your password:</p>
          <a href="${data.url}">${data.url}</a>
          <p>If you didn't request this, you can safely ignore this email.</p>
        `,
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 600,
    async sendVerificationEmail(data, request) {
      const verificationURL = `${env.NEXT_PUBLIC_APP_URL}/server/api/auth/verify-email?token=${data.token}&callbackURL=/dashboard`;

      await resend.emails.send({
        from: `AWFixer Links <${env.NEXT_PUBLIC_RESEND_FROM}>`,
        to: data.user.email,
        subject: "Verify your AWFixer Links account",
        html: `
          <h2>Verify your AWFixer Links Account</h2>
          <p>Click the link below to verify your email address:</P>
          <a href="${verificationURL}">${verificationURL}</a>
        `,
      });
    },
  },
  user: {
    deleteUser: {
      enabled: true,
      async sendDeleteAccountVerification(data, request) {
        const verificationURL = data.url;

        await resend.emails.send({
          from: `AWFixer Links <${env.NEXT_PUBLIC_RESEND_FROM}>}`,
          to: data.user.email,
          subject: "Delete your AWFixer Links account",
          html: `
            <h2>Delete your AWFixer Links Account</h2>
            <p>Click the link below to delete your account:</p>
            <a href="${verificationURL}">${verificationURL}</a>
          `,
        });
      },
    },
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
      enabled: true,
      maxAge: 60 * 60 * 24 * 30,
    },
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24 * 3,
  },
  onAPIError: {
    onError: (err) => {
      console.error("[BETTER_AUTH] API Error", err);
    },
    errorURL: `${env.NEXT_PUBLIC_APP_URL}/auth/sign-in`,
    throw: true,
  },
  plugins: [
    emailHarmony(),
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
        requireEmailVerification: true,
        plans: [
          {
            name: "pro",
            priceId: "price_1RkaLWRtO1V0nNQXXpTTXMuw",
            limits: { links: 50, analytics: 2 },
          },
        ],
        async onSubscriptionComplete(data, request) {
          if (data.plan.name === "pro") {
            await db.update(user).set({
              analytics: "pro",
            });
          }
        },
        async onSubscriptionCancel(data) {
          await db
            .update(user)
            .set({ analytics: "basic" })
            .where(eq(user.stripeCustomerId, data.subscription.referenceId));
        },
      },
    }),
  ],
  advanced: {
    cookiePrefix: "awfixer",
    ipAddress: {
      disableIpTracking: false, // Disable?
    },
  },
  trustedOrigins: [env.NEXT_PUBLIC_APP_URL, "http://localhost:3000"],
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
