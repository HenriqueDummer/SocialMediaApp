import { logout, queryClient, type ApiResponse } from "../utils/http";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { Input } from "./ui/input";
import Container from "./Container";

import { IoMdSearch } from "react-icons/io";

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
    <nav className="h-14 w-full transparent">
      <Container className="h-14 w-full rounded-full flex justify-between items-center">
        <div className="ml-5 flex relative">
          <IoMdSearch className="text-slate-300 text-2xl absolute left-2 top-2/4 -translate-y-2/4" />
          <Input className="rounded-full w-full !pl-10 !pr-4" placeholder="Search fron users or posts" type="text" />
        </div>
        <div>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button disabled={isPending} onClick={() => handleLogout()}>
            {isPending ? "Logging out..." : "Logout"}
          </Button>
        </div>
        
      </Container>
    </nav>
  );
};

export default Navbar;
