import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const fileRouter = {
  imageUploader: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  }).onUploadComplete(async ({ file }) => {
    return { fileURL: file.ufsUrl };
  }),
} satisfies FileRouter;

export type AWFixerFileRouter = typeof fileRouter;
