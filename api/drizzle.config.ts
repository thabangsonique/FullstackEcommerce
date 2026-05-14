import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: ["./src/db/productsSchema.ts", "./src/db/usersSchema.ts"],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
