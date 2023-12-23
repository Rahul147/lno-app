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
        const { title, completed } = item
        return <div className="flex items-center mb-3" key={title}>
          <input type="checkbox" id={title} className="checkbox" />
          <label className="ml-2 text-sm">{title}</label>
        </div>
      })
    }
  </>
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
          <div className="collapse collapse-arrow mb-3 border-grey-100 border">
            <input type="radio" name="my-accordion-3" defaultChecked="checked" />
            <div className="collapse-title text-lg font-medium flex justify-between">
              <div><span className="text-xl text-amber-400 font-bold capitalize">L</span> everage</div>
              <div className="mr-3">
                <div
                  className="radial-progress text-xs text-amber-700 border-1"
                  style={{ "--value": lCompletion, "--size": "1.8rem" }}
                  role="progressbar">
                  {lCompletion || ""}
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
            <div className="collapse-title text-lg font-medium flex justify-between">
              <div><span className="text-xl text-amber-400 font-bold capitalize">N</span> eutral</div>
              <div className="mr-3">
                <div
                  className="radial-progress text-xs bg-white border-4"
                  style={{ "--value": nCompletion, "--size": "0rem" }}
                  role="progressbar">
                  {nCompletion || ""}
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
            <div className="collapse-title text-lg font-medium flex justify-between">
              <div><span className="text-xl text-amber-400 font-bold capitalize">O</span> verhead</div>
              <div className="mr-3">
                <div
                  className="radial-progress text-xs bg-white border-4"
                  style={{ "--value": nCompletion, "--size": "0rem" }}
                  role="progressbar">
                  {oCompletion || ""}
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
