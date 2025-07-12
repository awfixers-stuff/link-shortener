import { NextRequest, NextResponse } from "next/server";
import { notFound } from "next/navigation";
import { resolve as resolveShortenedLink } from "@/lib/links/resolver";
import { generateQRCodeSVG } from "@/lib/links/qr";
import { db } from "@/lib/db";
import { link } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

function stripSvgFromLastSegment(segments: string[]): [string[], boolean] {
  if (segments.length === 0) return [segments, false];
  const last = segments[segments.length - 1];
  if (last.endsWith(".svg")) {
    const newLast = last.slice(0, -4);
    return [[...segments.slice(0, -1), newLast], true];
  }
  return [segments, false];
}

function findMatchingKey(
  pathname: string,
  links: Record<string, string>,
): string | null {
  let id = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  while (id.length > 0) {
    if (links[id]) return id;
    const slashIndex = id.lastIndexOf("/");
    if (slashIndex === -1) break;
    id = id.slice(0, slashIndex);
  }
  return null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string[] }> },
) {
  const { id } = await params;

  // Determine if .svg is present and strip it for lookup
  const [strippedId, isSVG] = stripSvgFromLastSegment(id);
  const lookupPath = `/${strippedId.join("/")}`;

  const url = new URL(request.url);
  const urlForResolution = new URL(
    `${url.origin}${lookupPath}${url.search}${url.hash}`,
  );

  // Fetch all online links from the database and build a lookup object
  const allLinks = await db.query.link.findMany({
    where: eq(link.status, "online"),
  });
  const linksLookup = Object.fromEntries(
    allLinks.map((l) => [l.key, l.destination]),
  );

  const destination = resolveShortenedLink(urlForResolution, linksLookup);
  if (!destination || destination.toString() === urlForResolution.toString()) {
    notFound();
  }

  // Debounced visit count update (fire and forget)
  const matchedKey = findMatchingKey(lookupPath, linksLookup);
  if (matchedKey) {
    // Use a microtask to debounce (ensures only one update per request)
    void Promise.resolve().then(async () => {
      await db
        .update(link)
        .set({
          visits: (allLinks.find((l) => l.key === matchedKey)?.visits ?? 0) + 1,
        })
        .where(eq(link.key, matchedKey));
    });
  }

  if (isSVG) {
    let qrCodeSVG: string;
    try {
      qrCodeSVG = await generateQRCodeSVG(destination.toString());
    } catch (error) {
      console.error("Error generating QR Code:", error);
      return new NextResponse(
        "Internal Server Error: Could not generate your QR Code",
        { status: 500 },
      );
    }
    return new NextResponse(qrCodeSVG, {
      status: 200,
      headers: { "Content-Type": "image/svg+xml" },
    });
  } else {
    return NextResponse.redirect(destination, 302);
  }
}
