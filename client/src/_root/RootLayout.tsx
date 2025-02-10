import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useQuery } from '@tanstack/react-query'
import type { UserType } from '../types/types'

const RootLayout = () => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  return (
    <div className='w-full h-screen bg-dark_bg flex p-5 gap-5'>
      {
        authUser && <Sidebar />
      }
      <Outlet />
    </div>
  )
}

export default RootLayout