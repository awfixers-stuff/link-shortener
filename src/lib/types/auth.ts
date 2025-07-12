import { auth } from "../auth";

type BetterAuthSession = typeof auth.$Infer.Session;
type AuthSession = typeof auth.$Infer.Session.session;
type AuthUser = typeof auth.$Infer.Session.user;

export type { BetterAuthSession, AuthSession, AuthUser };
