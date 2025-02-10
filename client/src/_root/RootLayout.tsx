import { Outlet } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { useQuery } from '@tanstack/react-query'
import type { User } from '../types/types'

const RootLayout = () => {
  const { data: authUser } = useQuery<User>({ queryKey: ["authUser"] });

  return (
    <div className='w-full h-screen bg-dark_bg flex'>
      <Outlet />
      {
        authUser && <Sidebar />
      }
    </div>
  )
}

export default RootLayout