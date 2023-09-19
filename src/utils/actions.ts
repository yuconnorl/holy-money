'use server'

import { db } from "@/db/drizzle";
import { categoriesTable } from "@/db/schema";
import { revalidatePath } from "next/cache";


export async function addCategory(data: FormData) {
  const newCategory = {
    categoryName: '456'
  }

  return await db.insert(categoriesTable).values(newCategory)
}