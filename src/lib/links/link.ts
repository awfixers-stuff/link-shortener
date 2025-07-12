import { db } from "@/lib/db";
import { link } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function linkMatcher(param: string): Promise<boolean> {
  let currentParam = param;
  while (currentParam.length > 0) {
    // Remove leading slash if present
    const key = currentParam.startsWith("/")
      ? currentParam.slice(1)
      : currentParam;
    const existing = await db.query.link.findFirst({
      where: eq(link.key, key),
    });
    if (existing) {
      return true;
    }
    const lastSlashIndex = currentParam.lastIndexOf("/");
    if (lastSlashIndex === -1) {
      currentParam = "";
    } else {
      currentParam = currentParam.slice(0, lastSlashIndex);
    }
  }
  return false;
}
