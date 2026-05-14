import { pgTable, integer, varchar, text } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  name: varchar({ length: 255 }),
  email: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),
  address: text(),
  role: text().default("user"),
});

//assign out data structure to zod for schema generation.
export const createUserSchema = createInsertSchema(usersTable).omit({
  //schema for user registration.
  role: true,
});

//schema for login.
export const loginSchema = createInsertSchema(usersTable).omit({
  role: true,
});
