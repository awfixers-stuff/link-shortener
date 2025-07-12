import { redirect, RedirectType } from "next/navigation";

export default async function AuthRedirectPage() {
  redirect("/auth/sign-in", RedirectType.replace);

  return null;
}
