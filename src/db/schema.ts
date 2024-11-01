import { STATUS } from "@/data/invoices";
import {
  pgTable,
  timestamp,
  text,
  serial,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";

export type Status = (typeof STATUS)[number]["id"];

const statuses = STATUS.map((status) => status.id) as Array<Status>;

export const statusEnum = pgEnum(
  "status",
  statuses as [Status, ...Array<Status>]
);

export const Invoices = pgTable("invoices", {
  id: serial("id").primaryKey(),
  createDate: timestamp("createDate").defaultNow().notNull(),
  value: integer("value").notNull(),
  description: text("description").notNull(),
  userId: text("userId").notNull(),
  status: statusEnum("status").notNull(),
});
