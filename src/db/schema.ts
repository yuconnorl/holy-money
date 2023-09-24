import { timestamp, serial, text, pgTable, varchar, numeric } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey(),
  categoryName: varchar("category_name", { length: 80 }).unique(),
});

export const membersTable = pgTable("members", {
  id: serial("id").primaryKey(),
  memberName: varchar("member_name", { length: 80 }).unique(),
});

export const storesTable = pgTable("stores", {
  id: serial("id").primaryKey(),
  storeName: varchar("store_name", { length: 80 }).unique(),
});

export const recordsTable = pgTable("records", {
  id: serial("id").primaryKey(), 
  amount: numeric("amount", { precision: 15, scale: 4 }),
  storeId: text("store_id").references(() => storesTable.id),
  categoryId: text("category_id").references(() => categoriesTable.id),
  memberId: text("member_id").references(() => membersTable.id),
  memo: varchar("memo", { length: 80 }),
  recordDate: varchar("record_date", { length: 20 }),
  createdAt: timestamp("created_at").defaultNow(),
});