import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { checkAuthStatus } from '../../utils/auth';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { ToastContainer } from 'react-toastify';

export const Route = createFileRoute('/_auth/_layout')({
  beforeLoad: async () => {
    const isAuthenticated = await checkAuthStatus();

    if (isAuthenticated) {
      throw redirect({
        to: "/"
      })
    }
  },
  component: Layout,
  pendingComponent: () => {
    return <LoadingScreen />
  }
})

function Layout() {
  return (
    <div className='w-full h-screen flex'>
      <ToastContainer />

      <div className='flex w-full xl:w-2/4 flex-col items-center xl:items-start justify-center xl:px-20 bg-black/90 xl:min-w-[50rem]'>
        <Outlet />
      </div>
      <div className='flex-1 bg-cover bg-center' style={{ backgroundImage: `url('/assets/login_bg4.png')` }}>

      </div>
    </div>
  )
}
