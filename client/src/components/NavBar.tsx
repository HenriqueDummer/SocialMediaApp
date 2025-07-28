import SideBarProfile from './SideBarProfile'
import { Button } from './ui/button'
import { VscHome } from 'react-icons/vsc'
import { IoIosSearch } from 'react-icons/io'
import { TbLogout2 } from 'react-icons/tb'
import { ConfirmActionDialog } from './ConfirmActionDialog'
import { useLogout } from '../hooks/useLogout'
import { Link } from '@tanstack/react-router'
import { RiVerifiedBadgeLine } from "react-icons/ri";

const NavBar = () => {
  const { mutate: handleLogout } = useLogout();

  return (
    <ul className="flex justify-around sm:flex-col xl:justify-center gap-4">
      <li>
        <SideBarProfile />
      </li>
      <li>
        <Link to={"/"} className='lg:w-full text-white flex justify-center items-center lg:aspect-auto aspect-square h-14 rounded-full text-lg font-light gap-4 sm:border border-zinc-600' activeProps={{ className: 'bg-accent_purple hover:bg-accent_purple border-none font-semibold' }} inactiveProps={{ className: 'bg-secondary_bg hover:bg-accent' }}>
          <VscHome className="scale-150" />
          <span className="hidden lg:inline">For you</span>
        </Link>

      </li>
      <li>
        <Link to={"/following"} className='lg:w-full text-white flex justify-center items-center lg:aspect-auto aspect-square h-14 rounded-full text-lg font-light gap-4 sm:border border-zinc-600' activeProps={{ className: 'bg-accent_purple hover:bg-accent_purple border-none font-semibold' }} inactiveProps={{ className: 'bg-secondary_bg hover:bg-accent' }}>
          <RiVerifiedBadgeLine className="scale-150" />
          <span className="hidden lg:inline">Following</span>
        </Link>

      </li>
      <li>
        <Link to={"/search"} className='lg:w-full  text-white flex justify-center items-center lg:aspect-auto aspect-square h-14 rounded-full text-lg font-light gap-4 sm:border border-zinc-600' activeProps={{ className: 'bg-accent_purple hover:bg-accent_purple border-none font-semibold' }} inactiveProps={{ className: 'bg-secondary_bg hover:bg-accent' }}>
          <IoIosSearch className="scale-150" />
          <span className="hidden lg:inline">Search</span>
        </Link>
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
    </ul >
  )
}

export default NavBar