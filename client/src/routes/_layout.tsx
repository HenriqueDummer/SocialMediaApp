import { createFileRoute,  Outlet, redirect } from '@tanstack/react-router'
import LeftSideBar from '../components/LeftSidebar';
import RightSideBar from '../components/RightSideBar';
import { checkAuthStatus } from '../utils/auth';
import { ToastContainer } from 'react-toastify';

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
                <ToastContainer />
                <div className="w-full h-full flex justify-center gap-4 px-4 lg:px-10 pt-4 backdrop-blur-sm">
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
