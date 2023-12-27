import { getUserSession } from "@/app/lib/session"
import Image from 'next/image'

export default async function NavBar() {
  const user = await getUserSession()

  return <div className="navbar bg-amber-300">
    <div className="flex-1">
      <a className="btn btn-ghost text-xl">LNO</a>
    </div>
    <div className="flex-none">
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {user?.image ? <Image alt="Tailwind CSS Navbar component" src={user?.image} width={40} height={40} /> : <></>}
          </div>
        </div>
      </div>
    </div>
  </div>
}
