import { fetchCurrentWeekTodos } from "@/app/lib/data"
import { TodoCard } from "@/app/ui/todo-card"
import { getWeekOfYear } from "@/app/lib/utility"
import { AddTodoButton } from "@/app/ui/new-button"
import { AddTodoModal } from "./add-todo-modal"

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

export async function TodoCardContainer({ searchParams }) {
  const wDateQuery = searchParams.wdate
  const {
    leverage: l = [],
    neutral: n = [],
    overhead: o = []
  } = await fetchCurrentWeekTodos(wDateQuery ?? getWeekOfYear(new Date()))
  const [lCompletion, nCompletion, oCompletion] = computeCompletionRation(l, n, o)
  const totalPercentageWorkDone = Math.ceil((lCompletion + nCompletion + oCompletion) / 3 || 0)
  // const dataPresent = (l.length > 0 && n.length > 0 && o.length > 0)

  return <>
    <AddTodoModal />

    <div className="card-body">
      <div className="flex justify-center">
        <progress className="progress progress-warning mt-2 mr-2" value={totalPercentageWorkDone} max="100" />
        <div className="font-black">{totalPercentageWorkDone}%</div>
      </div>


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

      <AddTodoButton />
    </div>
  </>
}
