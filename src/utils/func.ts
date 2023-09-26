import { eq } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { categoriesTable, membersTable,recordsTable, storesTable } from "@/db/schema";

// get all categories from categoriesTable
export async function getCategory() {
  return await db.select().from(categoriesTable);
}

// get all records from recordsTable
export async function getRecord() {
  return await db.select().from(recordsTable);
}

// retrieve specific store ID from storesTable
// export async function retrieveIdFromStores(storeName) {
//   const result = await db.select({
//     storeId: storesTable.id
//   })
//   .from(storesTable)
//   .where(eq(storesTable.storeName, storeName))

//   return result
// }

// join three tables into big chunk
export async function joinTables() {

  return await db.select({
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
}
