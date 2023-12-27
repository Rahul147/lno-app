const { db } = require("@vercel/postgres")
const { todos } = require("../src/app/lib/place-holder-data")

async function seedLNOs(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`
    await client.sql`DO $$
      BEGIN
          IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'category_type') THEN
              CREATE TYPE category_type AS ENUM('leverage', 'neutral', 'overhead');
          END IF;
      END
      $$;
    `
    const createTodoItemsTable = await client.sql`
        CREATE TABLE IF NOT EXISTS todos (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        user_id UUID NOT NULL,
        week_id INT NOT NULL,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        due_date TIMESTAMP,
        created_date TIMESTAMP NOT NULL,
        updated_at TIMESTAMP,
        category category_type NOT NULL,
        completed BOOLEAN DEFAULT FALSE,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `

    console.log(`Created "todos" table`)

    // Insert data into the "users" table
    const insertedTodos = await Promise.all(
      todos.map(async (todo) => {
        return client.sql`
          INSERT INTO todos (week_id, title, description, due_date, created_date, updated_at, category, completed, user_id)
          VALUES (
            ${todo.week_id}, 
            ${todo.title}, 
            ${todo.description}, 
            ${todo.due_date}, 
            ${todo.created_date}, 
            ${todo.updated_at}, 
            ${todo.category}, 
            ${todo.completed},
            ${"024816ab-6e78-42a1-9f0d-7fa6d3df1cb9"}
          )
        `
      }),
    )

    console.log(`Seeded ${insertedTodos.length} todos`)

    return {
      createTodoItemsTable,
      users: insertedTodos,
    }

  } catch (error) {
    console.error("Error seeding users:", error)
    throw error
  }
}
``
async function main() {
  const client = await db.connect()
  await seedLNOs(client)
  await client.end()
}

main()
  .catch((err) => {
    console.error(
      "An error occurred while attempting to seed the database:",
      err,
    )
  })
