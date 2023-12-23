export function TodoCardSkeleton({ title, items, completion }) {
  return <>
    <br />
    <div className="flex flex-col gap-4">
      <div className="skeleton h-38 w-full"></div>
      {/* <div className="skeleton h-4 w-28"></div> */}
      <div className="skeleton h-16 w-full"></div>
      <div className="skeleton h-16 w-full"></div>
      <div className="skeleton h-16 w-full h-"></div>
    </div>
  </>
}
