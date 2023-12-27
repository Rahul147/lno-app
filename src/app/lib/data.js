"use server"
import { sql } from "@vercel/postgres"
import { unstable_noStore as noStore } from "next/cache"
import { getWeekOfYear } from "@/app/lib/utility"
import { getUserSession } from "@/app/lib/session"

export async function fetchCurrentWeekTodos(weekId = getWeekOfYear(new Date())) {
  // Add noStore() here prevent the response from being cached.
  // This is equivalent to in fetch(..., {cache: "no-store"}).
  noStore()
  const user = await getUserSession()

  try {
    const data = await sql`SELECT * FROM todos 
            WHERE week_id = ${weekId}
            AND user_id = ${user.id}
            ORDER BY week_id DESC
        `
    return data.rows?.reduce((buckets, todo) => {
      if (!buckets[todo.category]) {
        buckets[todo.category] = [];
      }
      buckets[todo.category].push(todo);
      return buckets;
    }, {}) || { leverage: [], neutral: [], overhead: [] };
  } catch (error) {
    console.error("database error:", error)
    return { leverage: [], neutral: [], overhead: [] }
  }
}
