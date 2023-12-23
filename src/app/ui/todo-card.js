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


export function TodoCard({ title, items, completion }) {
  return <>
    <div className="collapse collapse-arrow mb-3 border-grey-100 border" >
      <input type="radio" name="my-accordion-3" />
      <div className="collapse-title text-lg font-medium flex justify-between">
        <div><span className="text-xl text-amber-400 font-bold capitalize">{title[0]}</span> {title.substring(1)}</div>
        <div className="mr-3">
          <div
            className={`radial-progress text-xs text-amber-700 ${completion ? "border-1" : "border-8"}`}
            style={{ "--value": completion, "--size": completion ? "1.8rem" : "0rem" }}
            role="progressbar">
            {completion || ""}
          </div>
        </div>
      </div>
      <div className="collapse-content">
        <GenerateCheckLists items={items} />
      </div>
    </div >
  </>
}
