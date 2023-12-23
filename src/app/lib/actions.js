"use server"
import { revalidatePath } from "next/cache"
import { sql } from '@vercel/postgres'

export async function updateTodo(id, formData) {
    const completed = formData.get("checked") === "on" ? true : false
    try {
        await sql`
            UPDATE todos
            SET completed = ${completed}
            WHERE id = ${id}
          `
    } catch (error) {
        return { message: "Database Error: Failed to Update Invoice." }
    }
    revalidatePath("/")
}
