import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import { env } from "../env";
import * as schema from "./schema";

const pool = new Pool({ connectionString: env.NEON_POSTGRES_DB_URL });
export const db = drizzle({ client: pool, schema });
