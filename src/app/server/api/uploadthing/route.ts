import { createRouteHandler } from "uploadthing/next";
import { fileRouter } from "./core";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { UTApi } from "uploadthing/server";

export const { GET, POST } = createRouteHandler({ router: fileRouter });
export const uploadthingAPI = new UTApi();

export async function DELETE(req: NextRequest) {
  try {
    const { key } = await req.json();
    if (!key) {
      return NextResponse.json({ error: "Missing file key" }, { status: 400 });
    }
    const result = await uploadthingAPI.deleteFiles(key);
    // No 'error' property, just check success
    if (!result.success) {
      return NextResponse.json(
        { error: "Failed to delete file" },
        { status: 500 },
      );
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    );
  }
}
