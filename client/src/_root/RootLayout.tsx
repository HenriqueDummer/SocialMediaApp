import { Outlet } from "react-router-dom";

import backgroundImage from "../../public/assets/bg_dark.png";
import RightSideBar from "../components/RightSideBar";
import { getAuthUser } from "../utils/hooks";
import LeftSideBar from "../components/LeftSidebar";

const RootLayout = () => {
  const authUser = getAuthUser();

  return (
    <div
      className="w-full h-screen justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >

        <div className="w-full h-full flex justify-center gap-10  px-10 pt-5 backdrop-blur-sm">
          {authUser && <LeftSideBar />}
          <div className="w-1/3 min-w-[36rem] relative">
            <Outlet />
          </div>
          <RightSideBar />
        </div>
    </div>
  );
};

export default RootLayout;
