import { getCookieCache } from "better-auth/cookies";
import { type NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // const sessionCookie = getSessionCookie(request, { cookiePrefix: "awfixer" });
  const sessionCookie = getCookieCache(request, { cookiePrefix: "awfixer" });

  if (!sessionCookie) {
    return NextResponse.redirect(new URL("/auth/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
