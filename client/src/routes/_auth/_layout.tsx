import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router'
import { checkAuthStatus } from '../../utils/auth';
import { LoadingScreen } from '../../components/ui/LoadingScreen';
import { ToastContainer } from 'react-toastify';
import { useEffect, useState } from 'react';

export const Route = createFileRoute('/_auth/_layout')({
  component: Layout,
})

function Layout() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuthStatus().then((isAuthenticated) => {
      if (!isAuthenticated) {
        navigate({ to: "/login" });
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className='w-full h-screen flex'>
      <ToastContainer />

      <div className='flex w-full xl:w-2/4 flex-col items-center xl:items-start justify-center xl:px-20 bg-secondary_bg xl:min-w-[50rem]'>
        <Outlet />
      </div>
      <div className='flex-1 bg-cover bg-center' style={{ backgroundImage: `url('/assets/login_bg4.png')` }}>

      </div>
    </div>
  )
}
