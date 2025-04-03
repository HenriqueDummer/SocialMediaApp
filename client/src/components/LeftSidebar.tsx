import { NavLink } from "react-router-dom";
import SideBarProfile from "./SideBarProfile";
import { Button } from "./ui/button";
import { VscHome } from "react-icons/vsc";
import { IoIosSearch } from "react-icons/io";
import { mutateLogout } from "../utils/hooks";
import { TbLogout2 } from "react-icons/tb";

const LeftSideBar = () => {
  const { mutate: handleLogout } = mutateLogout();

  return (
    <div className="w-1/4 self-start min-w-[25rem]">
      <SideBarProfile />
      <ul className="flex flex-col gap-2 mt-4">
        <li>
          <NavLink
            className={({ isActive }) => (!isActive ? `[&>*]:font-normal` : "")}
            to="/"
          >
            <Button className="w-full h-14 rounded-full bg-black text-lg flex gap-4 border border-zinc-600">
              <VscHome className="scale-125" />
              Home
            </Button>
          </NavLink>
        </li>
        <li>
          <NavLink
            className={({ isActive }) => (!isActive ? `[&>*]:font-normal` : "")}
            to="/search"
          >
            <Button className="w-full h-14 rounded-full bg-black text-lg flex gap-4 border border-zinc-600">
              <IoIosSearch className="scale-125" />
              Search
            </Button>
          </NavLink>
        </li>
        <li>
          <Button
            onClick={() => handleLogout()}
            className="w-full h-14 rounded-full bg-black text-lg font-normal flex gap-4 border border-zinc-600"
          >
            <TbLogout2 className="scale-125" />
            Logout
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default LeftSideBar;
