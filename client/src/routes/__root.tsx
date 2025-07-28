import { createRootRoute, Outlet } from '@tanstack/react-router'
import { ToastContainer } from 'react-toastify'
// import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'


export const Route = createRootRoute({

  component: () => (
    <div>
      <Outlet />
    </div>
  ),
})