import SideBarProfile from './SideBarProfile'
import { Button } from './ui/button'
import { VscHome } from 'react-icons/vsc'
import { IoIosSearch } from 'react-icons/io'
import { TbLogout2 } from 'react-icons/tb'
import { ConfirmActionDialog } from './ConfirmActionDialog'
import { useLogout } from '../hooks/useLogout'
import { Link } from '@tanstack/react-router'
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { ReactNode } from 'react'
import { type LinkProps } from '@tanstack/react-router'

//Pick - picks speficied properties
type NavLinkItem = {
  name: string,
  icon: ReactNode,
} & Pick<LinkProps, 'to'>

const linkItems: NavLinkItem[] =
  [
    {
      name: "For you",
      icon: <VscHome />,
      to: "/"
    }, {
      name: "Following",
      icon: <RiVerifiedBadgeLine />,
      to: "/following"
    }, {
      name: "Search",
      icon: <IoIosSearch />,
      to: "/search"
    },
  ]


const NavBar = () => {
  const { mutate: handleLogout } = useLogout();

  return (
    <ul className="flex justify-around sm:flex-col sm:py-2 xl:justify-center sm:gap-4">
      <li>
        <SideBarProfile />
      </li>
      {linkItems.map((link) => <li>
        <Link to={link.to} className='lg:w-full text-white flex  lg:justify-start lg:pl-4 justify-center  items-center lg:aspect-auto aspect-square h-12 sm:h-14 rounded-full font-light text-lg gap-4 sm:border border-zinc-600' activeProps={{ className: 'bg-accent_purple hover:bg-accent_purple border-none font-semibold' }} inactiveProps={{ className: 'bg-secondary_bg hover:bg-accent' }}>
          <span className='text-2xl'>{link.icon}</span>
          <span className="hidden lg:inline">{link.name}</span>
        </Link>
      </li>)}
      <li>
        <ConfirmActionDialog alertDialog='You are going to logout from your account' actionOnConfirm={handleLogout}>
          <Button
            className="lg:w-full sm:justify-start lg:aspect-auto  font-light aspect-square h-12 sm:h-14 rounded-full bg-secondary_bg text-lg flex gap-4 sm:border border-zinc-600"
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