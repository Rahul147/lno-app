"use server"
import { revalidatePath } from "next/cache"
import { sql } from '@vercel/postgres';


// const UpdateInvoice = FormSchema.omit({ id: true, checked: true });
export async function updateTodo(id, formData) {
    const completed = formData.get("checked") === "on" ? true : false
    console.log({ checked: completed, id })
    try {
        await sql`
            UPDATE todos
            SET completed = ${completed}
            WHERE id = ${id}
          `;
    } catch (error) {
        return { message: "Database Error: Failed to Update Invoice." };
    }
    revalidatePath("/");
}
