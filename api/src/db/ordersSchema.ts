import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default("New"),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

export const orderItemsTable = pgTable("order_items", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),

  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

//schema for the orderstable
export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  userId: true,
  status: true,
  createdAt: true,
});

//schema for the order vs products table
export const insertOrderItemSchema = createInsertSchema(orderItemsTable).omit({
  orderId: true,
});

//schema for a combination  of the orderstable schema and  order vs product table schema

/*we need the order information from the orderstable schema and we need the information 
about the items orderd from the order vs product(orderItemsTable) schema*/

export const insertOrdersWithItemsSchema = z.object({
  order: insertOrderSchema,
  items: z.array(insertOrderItemSchema),
});
