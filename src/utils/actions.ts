'use server'

import { eq } from 'drizzle-orm' 
import { z } from "zod";
import { zact } from "zact/server";
import { db, sql } from "@/db/drizzle";
import { categoriesTable, recordsTable, storesTable } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { retrieveIdFromStores } from "./func";
import { neon } from '@neondatabase/serverless';

import { Pool, neonConfig } from '@neondatabase/serverless';

export async function addCategory(data: FormData) {
  const aa = data.get("newCategory")

  const newCategory = {
    categoryName: aa
  }
  const insert = await db.insert(categoriesTable).values(newCategory);
  revalidatePath('/record')

  return insert
}


export async function addRecord(data: FormData) {
  
  const amount = data.get("amount")
  const storeName = data.get("store")
  const categoryId = data.get("category")
  const memberId = data.get("newCategory")
  const recordDate = data.get("recordDate")
  const memo = data.get("memo")

  const [_, newId] = await sql.transaction([
    sql`INSERT INTO stores (store_name) VALUES (${storeName}) ON CONFLICT (store_name) DO NOTHING`,
    sql`SELECT id FROM stores WHERE store_name = ${storeName}`,
  ]);
  
  const newRecord = {
    amount,
    categoryId,
    recordDate,
    memo,
    storeId: newId[0].id,
    memberId: 1,
  }

console.log(newRecord);

  
  const insert = await db.insert(recordsTable).values(newRecord);

  revalidatePath('/record')

  return 
}
