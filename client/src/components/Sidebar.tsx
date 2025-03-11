import { useQuery } from "@tanstack/react-query";

import { UserType } from "../types/types";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import type { ApiResponse } from "../utils/http";

const Sidebar = () => {
  const { data: { data: authUser } = {} as ApiResponse<UserType> } = useQuery<
    ApiResponse<UserType>
  >({ queryKey: ["authUser"] });
  return (
    <Container className="w-1/4 self-start overflow-hidden !p-0 min-w-[25rem]">
      <div
        className=" bg-slate-600 w-full h-32 bg-cover bg-center flex justify-center items-end"
        style={{
          backgroundImage: `url(${authUser?.coverPicture})`,
        }}
      >
        <div
          className="w-20 aspect-square rounded-full bg-center bg-cover translate-y-2/4"
          style={{
            backgroundImage: `url(${authUser?.profilePicture})`,
          }}
        ></div>
      </div>
      <div className="flex flex-col justify-center items-center mt-12 px-8">
        <h2 className="text-xl leading-5 font-semibold text-slate-200">
          {authUser!.fullName}
        </h2>
        <p className="text-slate-200 opacity-40 text-lg">
          @{authUser!.username}
        </p>
        <p className="text-lg text-center  text-slate-300 my-3">{authUser!.bio}</p>
      </div>
      <div className="flex items-center border-t border-b border-slate-700 mt-4">
        <div className="flex-1 flex flex-col justify-center items-center py-8">
          <p className="text-lg text-slate-300 font-semibold">234</p>
          <p className="text-slate-400">Followers</p>
        </div>
        <div className="h-20 w-[1px] bg-slate-700"></div>
        <div className="flex-1 flex flex-col justify-center items-center py-8">
          <p className="text-lg text-slate-300 font-semibold">234</p>
          <p className="text-slate-400">Following</p>
        </div>
      </div>
      <NavLink
        className="w-full flex justify-center items-center py-6 bg-transparent"
        to={"/profile/" + authUser!.username}
      >
        <p className="font-bold text-cyan-600 bg-gradient-to-br from-blue-600 to-rose-600 bg-clip-text text-transparent">My Profile</p>
      </NavLink>
    </Container>
  );
};

export default Sidebar;
