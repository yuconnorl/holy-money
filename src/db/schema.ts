import { numeric, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: serial("id").primaryKey().notNull(),
  categoryName: varchar("category_name", { length: 80 }).unique().notNull(),
});

export const membersTable = pgTable("members", {
  id: serial("id").primaryKey().notNull(),
  memberName: varchar("member_name", { length: 80 }).unique().notNull(),
});

export const storesTable = pgTable("stores", {
  id: serial("id").primaryKey(),
  storeName: varchar("store_name", { length: 80 }).unique(),
});

export const recordsTable = pgTable("records", {
  id: serial("id").primaryKey().notNull(), 
  amount: numeric("amount", { precision: 15, scale: 4 }).notNull(),
  storeId: text("store_id").references(() => storesTable.id).notNull(),
  categoryId: text("category_id").references(() => categoriesTable.id).notNull(),
  memberId: text("member_id").references(() => membersTable.id).notNull(),
  memo: varchar("memo", { length: 80 }).notNull(),
  recordDate: varchar("record_date", { length: 20 }).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});