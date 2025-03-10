import { logout, queryClient, type ApiResponse } from "../utils/http";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Input } from "./ui/input";

const Navbar = () => {
  const navigate = useNavigate();

  const { mutate: handleLogout, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      queryClient.setQueryData(["authUser"], { data: undefined });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      console.log(
        "After setQueryData:",
        queryClient.getQueryData(["authUser"])
      );
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
      navigate("/sign-in");
    },
  });

  return (
    <nav className="h-14 absolute top-0 left-0 w-full grid grid-cols-3 bg-slate-200">
      <div>
        <input type="text" />
      </div>
      <div>
        <Button disabled={isPending} onClick={() => handleLogout()}>
          {isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
      <div>

      </div>
    </nav>
  );
};

export default Navbar;
