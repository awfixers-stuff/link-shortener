import {
  generateUploadButton,
  generateUploadDropzone,
} from "@uploadthing/react";
import type { AWFixerFileRouter } from "@/app/server/api/uploadthing/core";

export const UploadButton = generateUploadButton<AWFixerFileRouter>({
  url: "/server/api/uploadthing",
});
export const UploadDropzone = generateUploadDropzone<AWFixerFileRouter>({
  url: "/server/api/uploadthing",
});
