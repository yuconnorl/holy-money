'use server'

import { revalidatePath } from "next/cache";

import { db, sql } from "@/db/drizzle";
import { categoriesTable, recordsTable, storesTable } from "@/db/schema";

export async function addCategory(data: FormData) {
  const category = data.get("new-category")

  const insert = await db.insert(categoriesTable).values({
    categoryName: category
  });
  revalidatePath('/record')

  return insert
}

export async function addNewRecord({
  amount, category, recordDate, store, memo
}) {

  const [_, newId] = await sql.transaction([
    sql`INSERT INTO stores (store_name) VALUES (${store}) ON CONFLICT (store_name) DO NOTHING`,
    sql`SELECT id FROM stores WHERE store_name = ${store}`,
  ]);
  
  const newRecord = {
    amount,
    categoryId: category,
    recordDate,
    memo,
    storeId: newId[0].id,
    memberId: 1,
  }

  // console.log(newRecord);
  
  return newRecord
  // const insert = await db.insert(recordsTable).values(newRecord);
  // revalidatePath('/record')

  return 
}