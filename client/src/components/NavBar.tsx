import { NavLink } from 'react-router-dom'
import SideBarProfile from './SideBarProfile'
import { Button } from './ui/button'
import { VscHome } from 'react-icons/vsc'
import { IoIosSearch } from 'react-icons/io'
import { TbLogout2 } from 'react-icons/tb'
import { ConfirmActionDialog } from './ConfirmActionDialog'
import { useLogout } from '../hooks/useLogout'

const NavBar = () => {
  const { mutate: handleLogout } = useLogout();

  return (
    <ul className="flex justify-around sm:flex-col xl:justify-center gap-4">
      <li>
        <SideBarProfile />
      </li>
      <li>
        <NavLink to="/">
          {({ isActive }) => (
            <Button
              className={`lg:w-full lg:aspect-auto aspect-square h-14 rounded-full text-lg font-light flex gap-4 sm:border border-zinc-600 ${isActive
                ? "bg-accent_purple hover:bg-accent_purple border-none font-semibold"
                : "bg-secondary_bg"
                }`}
            >
              <VscHome className="scale-150" />
              <span className="hidden lg:inline">Home</span>
            </Button>
          )}
        </NavLink>

      </li>
      <li>
        <NavLink to="/search">
          {({ isActive }) => (
            <Button
              aria-label="Search"
              className={`lg:w-full lg:aspect-auto aspect-square h-14 rounded-full text-lg font-light flex gap-4 sm:border border-zinc-600 ${isActive
                ? "bg-accent_purple border-none font-semibold"
                : "bg-secondary_bg"
                }`}
            >
              <IoIosSearch className="scale-150" />
              <span className="hidden lg:inline" aria-hidden="true">Search</span>
            </Button>
          )}
        </NavLink>

      </li>
      <li>
        <ConfirmActionDialog alertDialog='You are going to logout from your account' actionOnConfirm={handleLogout}>
          <Button
            className="lg:w-full lg:aspect-auto font-light aspect-square h-14 rounded-full bg-secondary_bg text-lg flex gap-4 sm:border border-zinc-600"
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