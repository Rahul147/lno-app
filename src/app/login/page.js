export default async function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen"> {/* Flex container with full viewport height */}
      <div className="card w-96 bg-base-100 shadow-sm"> {/* Your original card */}
        <div className="card-body">
          {/* <h2 className="card-title text-center">Make Progress</h2> */}
          <div className="card-actions justify-center">
            <button className="btn bg-amber-300 btn-wide text-black font-bold text-lg">Login</button>
          </div>
        </div>
      </div>
    </div>
  );
}

