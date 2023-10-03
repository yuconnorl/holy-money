'use server'

import dayjs from 'dayjs'
import { revalidatePath } from "next/cache";

import { db, sql } from "@/db/drizzle";
import { categoriesTable, recordsTable, storesTable } from "@/db/schema";

export async function addCategory(data: FormData) {
  const category = data.get("new-category")

  const insert = await db.insert(categoriesTable).values({
    categoryName: category
  });
  revalidatePath('/')

  return insert
}

interface NewRecord {
  amount: string
  category: string
  recordDate: string
  store: string
  memo: string
}

export async function addNewRecord({
  amount, category, recordDate, store, memo
}: NewRecord) {

  const [_, newId] = await sql.transaction([
    sql`INSERT INTO stores (store_name) VALUES (${store}) ON CONFLICT (store_name) DO NOTHING`,
    sql`SELECT id FROM stores WHERE store_name = ${store}`,
  ]);

  const day = dayjs(recordDate).get('date')
  const month = dayjs(recordDate).get('month')
  const year = dayjs(recordDate).get('year')

  const newRecord = {
    amount: parseInt(amount),
    categoryId: category,
    memo,
    storeId: newId[0].id,
    memberId: 1,
    recordDate,
    recordDay: day,
    recordMonth: month,
    recordYear: year,
  }

  const insert = await db.insert(recordsTable).values(newRecord);
  revalidatePath('/')

  return insert
}