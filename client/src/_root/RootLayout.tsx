import { Outlet } from "react-router-dom";

import backgroundImage from "../../public/assets/bg_dark.png";
import RightSideBar from "../components/RightSideBar";
import LeftSideBar from "../components/LeftSidebar";
import { useAuth } from "../Context/AuthContext";

const RootLayout = () => {
  const authUser = useAuth();

  return (
    <>
      {authUser.authUser !== null && (
        <div
          className="w-full h-screen justify-center bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="w-full h-full flex justify-center gap-10  px-10 pt-5 backdrop-blur-sm">
            <LeftSideBar />
            <div className="w-1/3 xl:min-w-[36rem] min-w-[32rem] relative">
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
