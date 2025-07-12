import "./next-env.config.ts";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  schema: "./src/lib/db/schema/index.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.NEON_POSTGRES_DB_URL!,
  },
});
