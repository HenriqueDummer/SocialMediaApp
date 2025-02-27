import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useQuery } from '@tanstack/react-query'
import type { UserType } from '../types/types'
import Navbar from './../components/Navbar';

const RootLayout = () => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  return (
    <div className='w-full h-screen bg-dark_bg flex p-5 pb-0 gap-5 relative pt-[5em]'>
      {
        authUser && <Sidebar />
      }
      <Navbar />
      <Outlet />
    </div>
  )
}

export default RootLayout