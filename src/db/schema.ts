import {
  pgTable,
  timestamp,
  text,
  serial,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export const statusEnum = pgEnum("status", [
  "open",
  "paid",
  "void",
  "uncollectible",
]);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  createDate: timestamp("createDate").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  status: statusEnum("status").notNull(),
});