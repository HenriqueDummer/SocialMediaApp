import React from "react";
import { logout, queryClient } from "../utils/http";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();

  const { mutate: handleLogout, isPending } = useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      queryClient.setQueryData(["authUser"], undefined);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
      navigate("/sign-in");
    },
  });

  // const handleLogout = async () => {
  //   await logout()
  //   queryClient.invalidateQueries({queryKey: ["authUser"]})
  //   navigate("/sign-in")
  // }
  return (
    <nav className="h-14 absolute top-0 left-0 w-full bg-slate-200">
      <Button disabled={isPending} onClick={() => handleLogout()}>
        {isPending ? "Logging out..." : "Logout"}
      </Button>
    </nav>
  );
};

export default Navbar;
