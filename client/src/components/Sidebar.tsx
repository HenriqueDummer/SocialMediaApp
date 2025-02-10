import { useQuery, useMutation } from "@tanstack/react-query";

import { User } from "../types/types";
import { logout, queryClient } from "../utils/http";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate()
  const { mutate: logoutFn, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: async (res) => {
      console.log(res.data.message);
      queryClient.setQueryData(["authUser"], null);
      await queryClient.invalidateQueries({ queryKey: ["authUser"] });
      navigate("/sign-in")
    }
  })

  const { data: authUser } = useQuery<User>({ queryKey: ["authUser"] });

  return (
    <nav className="w-1/4 flex flex-col pt-8 items-center">
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
              backgroundImage:
                "url(https://i.ytimg.com/vi/PJuLXzTI8Z4/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLA2TlEqECudLXyO5gEG93rc_LHt5A",
            }}
          >
            {" "}
          </div>
        </div>
        <div className="flex justify-center items-center mt-12">
          <h2 className="text-xl font-semibold text-slate-200">
            {authUser!.fullName}
          </h2>
          <p>{authUser!.username}</p>
        </div>
        <button onClick={() => logoutFn()} className="">
          {isPending ? "Logging out..." : "Logout"}
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
