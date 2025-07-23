import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { PostType } from "../types/types";
import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";

export const useReply = (handleSuccess: () => void) => {
    return useMutation({
        mutationFn: async ({ postId, text }: { postId: string, text: string }): Promise<ApiResponse<PostType>> => {
            try {
                const { data } = await axios.post(`/posts/reply/${postId}`, { text });
                return data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: () => {
            handleSuccess();
            toast.success("Reply posted", { theme: "dark", autoClose: 2000 });
        },
        onError: (error) => {
            toast.error(error.message, { theme: "dark", autoClose: 2000 });
        },
    });
};