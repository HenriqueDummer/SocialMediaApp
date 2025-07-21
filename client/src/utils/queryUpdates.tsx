import { toast } from "react-toastify";
import type { UserType } from "../types/types";
import { queryClient } from "./http";

export const updateQueryPostEdit = ({ id }: { id: string }) => {
  queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
  queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
  queryClient.invalidateQueries({ queryKey: ["post", id] });
};

export const updateQueryFollowing = (updatedFollowing: string[]) => {
  queryClient.setQueryData(
    ["authUser"],
    ({ data: oldData }: { data: UserType }) => {
      return {
        data: {
          ...oldData,
          following: updatedFollowing,
        },
      };
    }
  );
};

export const updateQueryProfileEdit = () => {
  // return (updatedProfile: UserType) => {
  // queryClient.setQueryData(["authUser"], () => {
  //   return {
  //     data: user,
  //   };
  // });
  // queryClient.setQueryData(["userProfile"], (oldData: UserType) => {
  //   return {
  //     ...oldData,
  //     user: updatedProfile,
  //   };
  // });

  toast("Profile updated", { theme: "dark", autoClose: 2000 });

  queryClient.invalidateQueries({ queryKey: ["userProfile"] });
  queryClient.invalidateQueries({ queryKey: ["authUser"] });
  // };
};
