import { createFileRoute,  Outlet, redirect } from '@tanstack/react-router'
import LeftSideBar from '../components/LeftSidebar';
import RightSideBar from '../components/RightSideBar';
import { checkAuthStatus } from '../utils/auth';

export const Route = createFileRoute('/_layout')({
    beforeLoad: async () => {
        const isAuthenticated = await checkAuthStatus()

        if (!isAuthenticated) {
            throw redirect({
                to: "/login"
            })
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <div
                className="relative pb-0 w-full h-screen justify-center bg-cover bg-center bg-secondary_bg/95"
            >
                <div className="w-full h-full flex justify-center lg:gap-10 gap-4 px-4 lg:px-10 pt-5 backdrop-blur-sm">
                    <LeftSideBar />
                    <div className="w-full md:w-2/3 md:min-w-[32rem] lg:w-1/3 xl:min-w-[36rem] overflow-hidden">
                        <Outlet />
                    </div>
                    <RightSideBar />
                </div>
            </div>
        </>
    );
}

// import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
// import LeftSideBar from '../components/LeftSidebar';
// import RightSideBar from '../components/RightSideBar';
// import { useAuth } from '../Context/AuthContext';
// import { useEffect } from 'react';
// import LoadingComponent from '../components/ui/LoadingComponent';

// export const Route = createFileRoute('/_layout')({
//     component: ProtectedRoute,
// })

// function ProtectedRoute() {
//     const { authUser, isLoading } = useAuth()
//     const navigate = useNavigate()

//     useEffect(() => {
//         if (!authUser && !isLoading) {
//             navigate({ to: '/login' })
//         }
//     }, [])

//     if (isLoading) {
//         return <LoadingComponent text='Checking auth...' />
//     }

//     return (
//         <div
//             className="relative pb-0 w-full h-screen justify-center bg-cover bg-center bg-secondary_bg/95"
//         >
//             <div className="w-full h-full flex justify-center lg:gap-10 gap-4 px-4 lg:px-10 pt-5 backdrop-blur-sm">
//                 <LeftSideBar />
//                 <div className="w-full md:w-2/3 md:min-w-[32rem] lg:w-1/3 xl:min-w-[36rem] overflow-hidden">
//                     <Outlet />
//                 </div>
//                 <RightSideBar />
//             </div>
//         </div>)
// }