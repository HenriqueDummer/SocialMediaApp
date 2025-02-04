import {Outlet} from 'react-router-dom'

const AuthLayout = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='flex flex-1 justify-center items-center bg-violet-800'>
        <Outlet />
      </div>
      <div className='flex-1 bg-slate-800'>

      </div>
    </div>
  )
}

export default AuthLayout