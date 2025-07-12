import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import type { AWFixerFileRouter } from "@/app/server/api/uploadthing/core";

export const UploadButton = generateUploadButton<AWFixerFileRouter>();
export const UploadDropzone = generateUploadDropzone<AWFixerFileRouter>();
