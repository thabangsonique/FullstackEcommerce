//data table for the products created.
import {
  integer,
  pgTable,
  varchar,
  doublePrecision,
  text,
} from "drizzle-orm/pg-core";

export const productsTable = pgTable("products", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(), //id for each product
  name: varchar({ length: 255 }).notNull(), //cant accept entry without name field
  price: doublePrecision().notNull(),
  image: varchar({ length: 255 }),
  Description: text(),
});
