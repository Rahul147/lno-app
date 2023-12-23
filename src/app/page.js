import { fetchCurrentWeekTodos } from '@/app/lib/data'
import { TodoCard } from '@/app/ui/todo-card'

function createFakeLNOData() {
  return {
    "l": [{ "title": "Review MR + Create RCA", "completed": true }, { "title": "DEXTER next steps", "completed": false }],
    "n": [{ "title": "Some title", "completed": false }],
    "o": [{ "title": "Some new title", "completed": false }]
  }
}

function getWeekOfYear(date) {
  const target = new Date(date.valueOf());
  const dayNr = (date.getDay() + 6) % 7;
  target.setDate(target.getDate() - dayNr + 3);
  // Start of ISO week year is the first Thursday
  const firstThursday = target.valueOf();
  target.setMonth(0, 1);
  if (target.getDay() !== 4) {
    target.setMonth(0, 1 + ((4 - target.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - target) / (7 * 24 * 60 * 60 * 1000));
}

function GenerateCheckLists({ items }) {
  return <>
    {items
      .map((item) => {
        const { title, completed, id } = item
        return <div className="flex items-center mb-3" key={id}>
          <input type="checkbox" id={id} className="checkbox" />
          <label className="ml-2 text-sm">{title}</label>
        </div>
      })
    }
  </>
}

function computeCompletionRation(l, n, o) {
  console.log({ l, n, o })
  const computeCompleted = (items) => items.reduce((accumulator, current) => {
    return accumulator += current.completed ? 1 : 0
  }, 0)
  return [
    Math.round((computeCompleted(l) / l.length) * 100),
    Math.round((computeCompleted(n) / n.length) * 100),
    Math.round((computeCompleted(o) / o.length) * 100)
  ];
}

export default async function Home() {
  const {
    leverage: l,
    neutral: n,
    overhead: o
  } = await fetchCurrentWeekTodos()
  const [lCompletion, nCompletion, oCompletion] = computeCompletionRation(l, n, o)

  return <div className="min-h-screen flex items-center justify-center">
    <div className="md:w-1/2 lg:w-1/3">
      <div className="card">

        {/* Card header */}
        <div className="card-title text-center justify-between pr-9 pl-9">
          {/* Left pagination */}
          <button className="butto"><kbd className="kbd bg-amber-200">◀︎</kbd></button>
          <kbd className="kbd bg-amber-200">{getWeekOfYear(new Date())} / 52</kbd>
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
