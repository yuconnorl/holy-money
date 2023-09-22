'use server'

import { z } from "zod";
import { zact } from "zact/server";
import { db } from "@/db/drizzle";
import { categoriesTable, recordsTable } from "@/db/schema";
import { revalidatePath } from "next/cache";


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
  const storeId = data.get("newCategory")
  const categoryId = data.get("category")
  const memberId = data.get("newCategory")
  const memo = data.get("memo")
  const createdAt = data.get("newCategory")

  const newRecord = {
    amount: amount,
    storeId: 1,
    categoryId: categoryId,
    memberId: 1,
    memo: memo,

  }

  console.log(data)

  
  const insert = await db.insert(recordsTable).values(newRecord);
  revalidatePath('/record')

  return insert
}