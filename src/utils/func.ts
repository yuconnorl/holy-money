import dayjs from 'dayjs'
import { eq, inArray } from "drizzle-orm";

import { db } from "@/db/drizzle";
import { categoriesTable, membersTable,recordsTable, storesTable } from "@/db/schema";

// get all categories from categoriesTable
export async function getCategory() {
  return await db.select().from(categoriesTable);
}

// get records from last seven days
export async function getMonthlyRecord(isRetrievePrevious = false) {
  const currentMonth = dayjs().get('month')
  const previousMonth = dayjs().get('month') - 1

  const currentMonthData = await db.select().from(recordsTable).where(eq(recordsTable.recordMonth, currentMonth));
  const previousMonthData = isRetrievePrevious ? await db.select().from(recordsTable).where(eq(recordsTable.recordMonth, previousMonth)) : undefined

  return {currentMonthData, previousMonthData}
}

// get records from last seven days
export async function getPastSevenDaysRecord() {
  const dateArray = [];

  for (let i = 0; i > -7; i--) {
    dateArray.push(dayjs().add(i, "day").format("MMM-DD-YYYY"));
  }

  return await db.select().from(recordsTable).where(inArray(recordsTable.recordDate, dateArray));
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
