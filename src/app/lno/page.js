import { fetchCurrentWeekTodos } from '@/app/lib/data'
import { TodoCard } from '@/app/ui/todo-card'
import { getWeekOfYear } from '@/app/lib/utility'

function computeCompletionRation(l, n, o) {
  const computeCompleted = (items) => items.reduce((accumulator, current) => {
    return accumulator += current.completed ? 1 : 0
  }, 0)
  return [
    Math.round((computeCompleted(l) / l.length) * 100),
    Math.round((computeCompleted(n) / n.length) * 100),
    Math.round((computeCompleted(o) / o.length) * 100)
  ]
}

export default async function Home() {
  const {
    leverage: l,
    neutral: n,
    overhead: o
  } = await fetchCurrentWeekTodos(getWeekOfYear(new Date()))
  const [lCompletion, nCompletion, oCompletion] = computeCompletionRation(l, n, o)

  return <div className="min-h-screen flex items-center justify-center">
    <div className="md:w-1/2 lg:w-1/3">
      <div className="card">

        {/* Card header */}
        <div className="card-title text-center justify-between pr-9 pl-9">
          {/* Left pagination */}
          <button className="butto"><kbd className="kbd bg-amber-200">◀︎</kbd></button>
          <kbd className="kbd bg-amber-200">{getWeekOfYear(new Date(), true)} / 52</kbd>
          {/* Right pagination */}
          <button className="button" disabled><kbd className="kbd">▶︎</kbd></button>
        </div>

        {/* Card body */}
        <div className="card-body">

          {/* L */}
          <TodoCard
            title={"Leverage"}
            items={l}
            completion={lCompletion}
          />

          {/* N */}
          <TodoCard
            title={"Neutral"}
            items={n}
            completion={nCompletion}
          />

          {/* O */}
          {/* N */}
          <TodoCard
            title={"Overhead"}
            items={o}
            completion={oCompletion}
          />

        </div>

      </div>
    </div>
  </div>
}
