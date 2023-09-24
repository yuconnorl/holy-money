import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";
import { categoriesTable, storesTable, recordsTable, membersTable } from "@/db/schema";

export async function getCategory() {
  return await db.select().from(categoriesTable);
}

export async function getRecord() {
  return await db.select().from(recordsTable);
}

export async function retrieveIdFromStores(storeName) {
  const result = await db.select({
    storeId: storesTable.id
  })
  .from(storesTable)
  .where(eq(storesTable.storeName, storeName))

  return result
}

export async function joinTables() {

  const result = await db.select({
    id: recordsTable.id,
    amount:  recordsTable.amount,
    memo: recordsTable.memo,
    recordDate: recordsTable.recordDate,
    storeName: storesTable.storeName,
    categoryName: categoriesTable.categoryName,
    memberName: membersTable.memberName
  })
  .from(recordsTable)
  .leftJoin(storesTable, eq(recordsTable.storeId, storesTable.id))
  .leftJoin(categoriesTable, eq(recordsTable.categoryId, categoriesTable.id))
  .leftJoin(membersTable, eq(recordsTable.memberId, membersTable.id))
  
  return result
}
