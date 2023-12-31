"use server"
import { revalidatePath, redi } from "next/cache"
import { sql } from '@vercel/postgres'
import { redirect } from 'next/navigation'
import { AuthError } from 'next-auth'
import { getUserSession } from "@/app/lib/session"

export async function updateTodo(id, formData) {
  const user = await getUserSession()
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

export async function createTodo(formData) {
  const todo = {
    week_id: formData.get("wDate"),
    title: formData.get("title"),
    category: formData.get("category"),
    created_date: new Date(),
    completed: false
  }
  try {
    await sql`
        INSERT INTO todos (week_id, title, created_date, category, completed)
        VALUES (
            ${todo.week_id}, 
            ${todo.title}, 
            ${todo.created_date}, 
            ${todo.category}, 
            ${todo.completed}
        )
    `
  } catch (error) {
    return { message: "Database Error: Failed to Update Invoice." }
  }
  revalidatePath(`/?wdate=${todo.week_id}`);
  redirect(`/?wdate=${todo.week_id}`);
}

export async function authenticate(
  prevState,
  formData,
) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
