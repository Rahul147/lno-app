import { sql } from '@vercel/postgres'
import { unstable_noStore as noStore } from 'next/cache'

function getWeekOfYear(date) {
    const target = new Date(date.valueOf())
    const dayNr = (date.getDay() + 6) % 7
    target.setDate(target.getDate() - dayNr + 3)
    // Start of ISO week year is the first Thursday
    const firstThursday = target.valueOf()
    target.setMonth(0, 1)
    if (target.getDay() !== 4) {
        target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7)
    }
    return target.getFullYear() * 100 + 1 + Math.ceil((firstThursday - target) / (604800000))
}

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
