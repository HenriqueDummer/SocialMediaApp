import {Outlet} from 'react-router-dom'


const AuthLayout = () => {
  return (
    <div className='w-full h-screen flex'>
      <div className='flex w-full xl:w-2/4 flex-col items-center xl:items-start justify-center xl:px-20 bg-black/90 xl:min-w-[50rem]'>
        <Outlet />
      </div>
      <div className='flex-1 bg-slate-800 bg-cover bg-center' style={{backgroundImage: `url('/assets/login_bg4.png')`}}>

      </div>
    </div>
  )
}

export default AuthLayout