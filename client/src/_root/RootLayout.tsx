import { Outlet } from "react-router-dom";
import LeftSideBar from "../components/LeftSidebar";
import { useQuery } from "@tanstack/react-query";
import type { UserType } from "../types/types";

import backgroundImage from "../../public/assets/bg_dark.png";
import RightSideBar from "../components/RightSideBar";

const RootLayout = () => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  return (
    <div
      className="w-full h-screen justify-center px-10 pt-5 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* <Navbar /> */}

      <div className="w-full h-full flex justify-center gap-10">
        {authUser && <LeftSideBar />}
        <div className="w-2/5 min-w-[36rem] relative">
          <Outlet />
        </div>
        <RightSideBar />
      </div>
    </div>
  );
};

export default RootLayout;
