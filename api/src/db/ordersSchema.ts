import {
  integer,
  varchar,
  timestamp,
  pgTable,
  doublePrecision,
} from "drizzle-orm/pg-core";
import { usersTable } from "./usersSchema.js";
import { productsTable } from "./productsSchema.js";
import { createInsertSchema } from "drizzle-zod";

export const ordersTable = pgTable("orders", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull(),
  status: varchar({ length: 50 }).notNull(),

  //reference each order to a sningle user that created it
  userId: integer()
    .references(() => usersTable.id)
    .notNull(),
});

/*create table that ties the orders to the number of products for each order. many to many.
single product can have multiple orders. and single order can have multiple products
*/

export const ordersItemsTable = pgTable("order_items", {
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

export const insertOrderSchema = createInsertSchema(ordersTable).omit({
  userId: true, //user must not insert id
  status: true,
  createdAt: true,
});
