import { Outlet } from "react-router-dom";

import RightSideBar from "../components/RightSideBar";
import LeftSideBar from "../components/LeftSidebar";
import { useAuth } from "../Context/AuthContext";

const RootLayout = () => {
  const authUser = useAuth();

  return (
    <>
      {authUser.authUser !== null && (
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
      )}
    </>
  );
};

export default RootLayout;
