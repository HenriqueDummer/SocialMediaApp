import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/axiosSetup";
import { toast } from "react-toastify";
import axios from "axios";

export const useDeletePost = () => {
    return useMutation({
        mutationFn: async (
            postId: string
        ): Promise<{ message: string }> => {
            try {
                const { data } = await axios.delete(`/posts/delete/${postId}`);
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