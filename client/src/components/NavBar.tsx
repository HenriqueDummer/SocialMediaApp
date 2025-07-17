import { NavLink } from 'react-router-dom'
import SideBarProfile from './SideBarProfile'
import { Button } from './ui/button'
import { VscHome } from 'react-icons/vsc'
import { IoIosSearch } from 'react-icons/io'
import { TbLogout2 } from 'react-icons/tb'
import { mutateLogout } from '../hooks/hooks'
import { ConfirmActionDialog } from './ConfirmActionDialog'

const NavBar = () => {
  const { mutate: handleLogout } = mutateLogout();

  return (
    <ul className="flex justify-around sm:flex-col xl:justify-center gap-4">
      <li>
        <SideBarProfile />
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (!isActive ? `[&>*]:font-light` : "")}
          to="/"
        >
          <Button className="lg:w-full lg:aspect-auto aspect-square h-14 rounded-full bg-black text-lg flex gap-4 sm:border border-zinc-600">
            <VscHome className="scale-150" />
            <span className="hidden lg:inline">Home</span>
          </Button>
        </NavLink>
      </li>
      <li>
        <NavLink
          className={({ isActive }) => (!isActive ? `[&>*]:font-light ` : "")}
          to="/search"
        >
          <Button className="lg:w-full lg:aspect-auto aspect-square h-14 rounded-full bg-black text-lg flex gap-4 sm:border border-zinc-600">
            <IoIosSearch className="scale-150" />
            <span className="hidden lg:inline">Search</span>
          </Button>
        </NavLink>
      </li>
      <li>
        <ConfirmActionDialog alertDialog='You are going to logout from your account' actionOnConfirm={handleLogout}>
          <Button
            className="lg:w-full lg:aspect-auto font-light aspect-square h-14 rounded-full bg-black text-lg flex gap-4 sm:border border-zinc-600"
          >
            <TbLogout2 className="scale-150" />
            <span className="hidden lg:inline">Logout</span>
          </Button>
        </ConfirmActionDialog>

      </li>
    </ul>
  )
}

export default NavBar