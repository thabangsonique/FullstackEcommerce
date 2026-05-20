import { defineConfig } from "drizzle-kit";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: [
    "./src/db/productsSchema.ts",
    "./src/db/usersSchema.ts",
     "./src/db/ordersSchema.ts", // include orders schema so migrations include orders and order_items tables
  ],
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
