// import { Home2 } from "@/app/TodoMain"
import { fetchCurrentWeekTodos } from '@/app/lib/data'
import { TodoCard } from '@/app/ui/todo-card'
import { getWeekOfYear } from '@/app/lib/utility'
import Link from 'next/link'
import { Home2 } from './TodoMain'
import { TodoCardSkeleton } from '@/app/ui/todo-card-skeleton'
import { Suspense } from 'react'


function computeCompletionRation(l = [], n = [], o = []) {
  const computeCompleted = (items) => items?.reduce((accumulator, current) => {
    return accumulator += current.completed ? 1 : 0
  }, 0) || 0
  return [
    Math.round((computeCompleted(l) / l.length) * 100),
    Math.round((computeCompleted(n) / n.length) * 100),
    Math.round((computeCompleted(o) / o.length) * 100)
  ]
}

export default async function Page({ searchParams }) {
  const wDateQuery = Number(searchParams.wdate, 10)
  // const {
  //   leverage: l = [],
  //   neutral: n = [],
  //   overhead: o = []
  // } = await fetchCurrentWeekTodos(wDateQuery ?? getWeekOfYear(new Date()))
  // const [lCompletion, nCompletion, oCompletion] = computeCompletionRation(l, n, o)

  // const dataPresent = (l.length > 0 && n.length > 0 && o.length > 0)

  return <main>
    <div className="navbar bg-amber-300 text-black">
      <button className="btn btn-ghost text-xl font-black underline">LNO</button>
    </div>
    <div className="min-h-screen flex mt-20 justify-center">

      <div className="md:w-1/2 lg:w-1/3">
        <div className="card">

          {/* Card header */}
          <div className="card-title text-center justify-between pr-9 pl-9">
            {/* Left pagination */}
            <Link className="button" href={`/?wdate=${wDateQuery - 1}`} prefetch={true}><kbd className="kbd bg-amber-200">◀︎</kbd></Link>
            <kbd className="kbd bg-amber-200">{String(wDateQuery).replace('2023', '')} / 52</kbd>
            {/* Right pagination */}
            <Link className="button" href={`/?wdate=${wDateQuery + 1}`} prefetch={true}> <kbd className="kbd">▶︎</kbd></Link>
          </div>

          {/* Card body */}
          <div>
            <Suspense fallback={<TodoCardSkeleton />}>
              <Home2 searchParams={searchParams} />
            </Suspense>
          </div>

        </div>
      </div>
    </div >
  </main>
}
