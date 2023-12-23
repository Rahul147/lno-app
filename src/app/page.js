'use client'

function createFakeLNOData() {
  return {
    "l": [{ "title": "Review MR + Create RCA", "completed": true }, { "title": "DEXTER next steps", "completed": false }],
    "n": [{ "title": "Some title", "completed": false }],
    "o": [{ "title": "Some new title", "completed": false }]
  }
}

function GenerateCheckLists({ items }) {
  return <div>
    {items.map(GenerateCheckListItem)}
  </div>
}

function GenerateCheckListItem(item) {
  const { title, completed } = item
  return <div className="flex items-center mb-3" key={title}>
    <input type="checkbox" id={title} className="checkbox" />
    <label className="ml-2 text-sm">{title}</label>
  </div>

}

function computeCompletionRation(l, n, o) {
  const computeCompleted = (items) => items.reduce((accumulator, current) => {
    return accumulator += current.completed ? 1 : 0
  }, 0)
  return [
    Math.round((computeCompleted(l) / l.length) * 100),
    Math.round((computeCompleted(n) / n.length) * 100),
    Math.round((computeCompleted(o) / o.length) * 100)
  ];
}


export default function Home() {
  const { l, n, o } = createFakeLNOData()
  const [lCompletion, nCompletion, oCompletion] = computeCompletionRation(l, n, o)

  return <div className="min-h-screen flex items-center justify-center">
    <div className="w-1/2">

      <div className="card">
        <div className="card-body">

          {/* L */}
          <div className="collapse collapse-arrow mb-3 border-grey-100 border">
            <input type="radio" name="my-accordion-3" defaultChecked="checked" />
            <div className="collapse-title text-xl font-medium flex justify-between">
              <div><b>L</b>everage</div>
              <div className="mr-3">
                <div
                  className="radial-progress text-xs bg-white border-1"
                  style={{ "--value": lCompletion, "--size": "1.8rem" }}
                  role="progressbar">{lCompletion}
                </div>
              </div>
            </div>
            <div className="collapse-content">
              <GenerateCheckLists items={l} />
            </div>
          </div>

          {/* N */}
          <div className="collapse collapse-arrow mb-3 border-grey-100 border" >
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium flex justify-between">
              <div><b>N</b>eutral</div>
              <div className="mr-3">
                <div
                  className="radial-progress text-xs bg-white border-4"
                  style={{ "--value": nCompletion, "--size": "0rem" }}
                  role="progressbar">
                  {/* {nCompletion} */}
                </div>
              </div>
            </div>
            <div className="collapse-content">
              <GenerateCheckLists items={n} />
            </div>
          </div>

          {/* O */}
          <div className="collapse collapse-arrow mb-3 border-grey-100 border">
            <input type="radio" name="my-accordion-3" />
            <div className="collapse-title text-xl font-medium flex justify-between">
              <div><b>O</b>verhead</div>
              <div className="mr-3">
                <div
                  className="radial-progress text-xs bg-white border-4"
                  style={{ "--value": nCompletion, "--size": "0rem" }}
                  role="progressbar">
                  {/* {nCompletion} */}
                </div>
              </div>
            </div>
            <div className="collapse-content">
              <GenerateCheckLists items={o} />
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
}
