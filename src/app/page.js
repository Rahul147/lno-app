import Link from "next/link"
import { TodoCardContainer } from "./ui/todo-container"
import { TodoCardSkeleton } from "@/app/ui/todo-card-skeleton"
import { Suspense } from "react"
import { getWeekOfYear } from "@/app/lib/utility"
import { getUserSession } from "@/app/lib/session"
import NavBar from "@/app/ui/navbar"

export default async function Page({ searchParams }) {
  const user = await getUserSession()
  const wDateQuery = searchParams.wdate
    ? Number(searchParams.wdate, 10)
    : getWeekOfYear(new Date())

  return <>
    <main>

      {/* Navbar */}
      <NavBar />

      <div className="lg:flex md:flex mt-20 justify-center">

        <div className="md:w-3/5 lg:w-2/5">
          <div className="card shadow-xl">

            {/* Card header */}
            <div className="card-title text-center justify-between pr-9 pl-9">
              {/* Left pagination */}
              <Link className="button" href={`/?wdate=${wDateQuery - 1}`} prefetch={true}><kbd className="kbd bg-amber-200">◀︎</kbd></Link>
              <kbd className="kbd bg-amber-200">{String(wDateQuery).replace("2023", "")} / 52</kbd>
              {/* Right pagination */}
              <Link className="button" href={`/?wdate=${wDateQuery + 1}`} prefetch={true}><kbd className="kbd  bg-amber-200">▶︎</kbd></Link>
            </div>

            {/* Card body */}
            <div>
              <Suspense key={wDateQuery} fallback={<TodoCardSkeleton />}>
                <TodoCardContainer searchParams={searchParams} />
              </Suspense>
            </div>

          </div>
        </div>
      </div >
    </main>
  </>
}
