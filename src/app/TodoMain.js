import { fetchCurrentWeekTodos } from '@/app/lib/data'
import { TodoCard } from '@/app/ui/todo-card'
import { getWeekOfYear } from '@/app/lib/utility'

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

export async function Home2({ searchParams }) {
  const wDateQuery = searchParams.wdate
  const {
    leverage: l = [],
    neutral: n = [],
    overhead: o = []
  } = await fetchCurrentWeekTodos(wDateQuery ?? getWeekOfYear(new Date()))
  const [lCompletion, nCompletion, oCompletion] = computeCompletionRation(l, n, o)
  // const dataPresent = (l.length > 0 && n.length > 0 && o.length > 0)

  return <>
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
      <TodoCard
        title={"Overhead"}
        items={o}
        completion={oCompletion}
      />

    </div>
  </>
}
