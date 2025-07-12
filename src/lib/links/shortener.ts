import { type NextRequest, NextResponse } from "next/server";
import { resolve as resolveShortenedLink } from "./resolver";
import { db } from "@/lib/db";
import { link } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function shortener(request: NextRequest) {
  try {
    const url = new URL(request.url);
    if (url.pathname.toLowerCase().endsWith(".svg")) {
      return NextResponse.next();
    }

    // Fetch all links from the database and build a lookup object
    const allLinks = await db.query.link.findMany({
      where: eq(link.status, "online"),
    });
    const linksLookup = Object.fromEntries(
      allLinks.map((l) => [l.key, l.destination]),
    );

    const destination = resolveShortenedLink(url, linksLookup);
    if (destination.toString() === url.toString()) {
      return NextResponse.next();
    }

    return NextResponse.redirect(destination, 302);
  } catch (error) {
    return NextResponse.next();
  }
}
