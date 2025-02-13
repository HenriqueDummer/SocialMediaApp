import { useQuery, useMutation } from "@tanstack/react-query";

import { UserType } from "../types/types";
import { logout, queryClient } from "../utils/http";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Sidebar = () => {
  const navigate = useNavigate();
  const { mutate: logoutFn, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async (res) => {
      console.log(res.data.message);
      queryClient.setQueryData(["authUser"], null);
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/sign-in");
    },
  });

  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  return (
    <nav className="w-1/4 flex flex-col items-center">
      <div className="rounded-3xl overflow-hidden w-[90%] bg-light_bg w-full min-h-16">
        <div
          className=" bg-slate-600 w-full h-20 flex justify-center items-end"
          style={{
            backgroundImage:
              "url(https://img.freepik.com/free-vector/abstract-paper-cut-shape-wave-background_474888-4433.jpg",
          }}
        >
          <div
            className="w-20 aspect-square rounded-full bg-center bg-cover translate-y-2/4"
            style={{
              backgroundImage: `url(${authUser?.profilePicture})`,
            }}
          >
          </div>
        </div>
        <div className="flex flex-col justify-center items-center mt-12">
          <h2 className="text-xl leading-5 font-semibold text-slate-200">
            {authUser!.fullName}
          </h2>
          <p className="text-slate-200 opacity-40 text-lg">@{authUser!.username}</p>
          <p className="text-lg text-slate-300 my-3">{authUser!.bio}</p>
        </div>
        <div className="flex items-center border-t border-b border-slate-700">
          <div className="flex-1 flex flex-col justify-center items-center py-10">
            <p className="text-lg text-slate-300 font-semibold">234</p>
            <p className="text-slate-400">Followers</p>
          </div>
          <div className="h-20 w-[1px] bg-slate-700"></div>
          <div className="flex-1 flex flex-col justify-center items-center py-10">
            <p className="text-lg text-slate-300 font-semibold">234</p>
            <p className="text-slate-400">Following</p>
          </div>
        </div>
        <Button className="w-full flex justify-center items-center py-8 bg-transparent" onClick={() => logoutFn()}>
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </nav>
  );
};

export default Sidebar;
