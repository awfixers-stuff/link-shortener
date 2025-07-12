import { betterAuth } from "better-auth";
import { env } from "./env";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import {
  jwt,
  openAPI,
  username,
  haveIBeenPwned,
  admin,
} from "better-auth/plugins";
import { nextCookies } from "better-auth/next-js";

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
