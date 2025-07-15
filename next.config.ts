import type { NextConfig } from "next";
import { createJiti } from "jiti";
import { fileURLToPath } from "node:url";

const jiti = createJiti(fileURLToPath(import.meta.url));

jiti.esmResolve("./src/lib/env");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ hostname: "ef2gxidd9t.ufs.sh", protocol: "https" }],
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
