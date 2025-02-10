import { useQuery, useMutation } from "@tanstack/react-query";

import { UserType } from "../types/types";
import { logout, queryClient } from "../utils/http";
import { useNavigate } from "react-router-dom";

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
  console.log(authUser)
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
          <p>@{authUser!.username}</p>
          <h2 className="text-xl font-semibold text-slate-200">
            {authUser!.fullName}
          </h2>
          <p>{authUser!.bio}</p>
        </div>
        <button onClick={() => logoutFn()} className="">
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
