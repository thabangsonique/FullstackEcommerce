import { drizzle } from "drizzle-orm/node-postgres"; //runs queries to our database
import pg from "pg"; //helps connect to our database

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL!,
});

export const db = drizzle(pool);
