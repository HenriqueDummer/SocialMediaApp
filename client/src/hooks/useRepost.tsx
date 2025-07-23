import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/axiosSetup";
import { ApiResponse } from "../types/ApiResponse";
import { toast } from "react-toastify";
import { PostType } from "../types/types";
import axios from "axios";

export const useRepost = () => {
    return useMutation({
        mutationFn: async (
            postId: string
        ): Promise<ApiResponse<PostType>> => {
            try {
                const { data } = await axios.post("/posts/repost/" + postId);
                return data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
            queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
            toast.success(res.message, {
                theme: "dark",
                autoClose: 2000,
            });
        },
    });
};