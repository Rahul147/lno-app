import { sql } from '@vercel/postgres'

export const dynamic = 'force-dynamic'
export async function GET(request) {
  return Response.json({ data: "Hello, world!" })
}

export async function PUT(request) {
  try {
    const { id, completed } = await request.json()

    // validate request body
    if (id == undefined || completed === undefined) {
      return Response.json({ error: "id or completed missing" }, { status: 400 })
    }

    console.log(`${id} updated to ${completed}`)

    try {
      await sql`
                UPDATE todos
                SET completed = ${completed}
                WHERE id = ${id}
              `
      return Response.json({ data: `${id} updated to ${completed}` }, { status: 200 })
    } catch (error) {
      return Response.json({ error: error.message }, { status: 500 })
    }
  } catch (error) {
    console.log(error)
    return Response.json({ error: "something went wrong" }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    const {
      wDate,
      createdDate,
      title,
      category,
      completed
    } = await request.json()

    await sql`
      INSERT INTO todos (week_id, title, created_date, category, completed)
      VALUES (
          ${wDate}, 
          ${title}, 
          ${createdDate}, 
          ${category}, 
          ${completed}
      )
    `
    return Response.json({ data: `${title} inserted` }, { status: 200 })
  } catch (error) {
    console.log(error)
    return Response.json({ error: "something went wrong" }, { status: 500 })
  }
}
