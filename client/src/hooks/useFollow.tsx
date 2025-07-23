import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/axiosSetup";
import { toast } from "react-toastify";
import { updateQueryFollowing } from "../utils/queryUpdates";
import axios from "axios";

export const useFollow = () => {
    return useMutation({
        mutationFn: async (userId: string) => {
            try {
                const { data } = await axios.post("/user/follow/" + userId);
                return data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
            queryClient.invalidateQueries({ queryKey: ["following"] });
            queryClient.invalidateQueries({ queryKey: ["who_to_follow"] });
            updateQueryFollowing(res.data);
            toast.success(res.message, {
                theme: "dark",
                autoClose: 2000,
            });
        },
    });
};