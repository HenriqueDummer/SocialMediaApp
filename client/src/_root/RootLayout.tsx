import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import type { UserType } from "../types/types";
import Navbar from "./../components/Navbar";

import backgroundImage from "../../public/assets/bg_dark.png";

const RootLayout = () => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  return (
    <div
      className="w-full h-screen justify-center px-10 pt-5 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />

      <div className="w-full h-full flex mt-5 justify-center gap-10">
        {authUser && <Sidebar />}
        <div className="w-2/5 min-w-[36rem] overflow-auto no_scrollbar">
          <Outlet />
        </div>
        {authUser && <Sidebar />}
      </div>
    </div>
  );
};

export default RootLayout;
