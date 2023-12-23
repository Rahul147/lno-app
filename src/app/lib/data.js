import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'
import { getWeekOfYear } from '@/app/lib/utility'

export async function fetchTodos() {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    // noStore()

    try {
        const data = await sql`SELECT * FROM todos 
        ORDER BY category, week_id`

        return data.rows
    } catch (error) {
        console.error('Database Error:', error)
        throw new Error('Failed to fetch todos.')
    }
}

export async function fetchCurrentWeekTodos(weekId = getWeekOfYear(new Date())) {
    // Add noStore() here prevent the response from being cached.
    // This is equivalent to in fetch(..., {cache: 'no-store'}).
    // noStore()
    await new Promise((resolve) => setTimeout(resolve, 1500));

    try {
        const data = await sql`SELECT * FROM todos 
            WHERE week_id = ${weekId} 
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
        console.error('Database Error:', error)
        throw new Error('Failed to fetch the current week todos.')
    }
}
