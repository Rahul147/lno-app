import Link from 'next/link'
import { Home2 } from './TodoMain'
import { TodoCardSkeleton } from '@/app/ui/todo-card-skeleton'
import { Suspense } from 'react'

export default async function Page({ searchParams }) {
  const wDateQuery = Number(searchParams.wdate, 10)

  return <main>
    <div className="navbar bg-amber-300 text-black">
      <button className="btn btn-ghost text-xl font-black">LNO</button>
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
            <Link className="button" href={`/?wdate=${wDateQuery + 1}`} prefetch={true}><kbd className="kbd  bg-amber-200">▶︎</kbd></Link>
          </div>

          {/* Card body */}
          <div>
            <Suspense key={wDateQuery} fallback={<TodoCardSkeleton />}>
              <Home2 searchParams={searchParams} />
            </Suspense>
          </div>

        </div>
      </div>
    </div >
  </main>
}
