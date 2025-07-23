import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/axiosSetup";
import { ApiResponse } from "../types/ApiResponse";
import axios from "axios";

export const useLikeReply = () => {
    return useMutation({
        mutationFn: async ({ replyId, postId }: {
            replyId: string,
            postId: string
        }): Promise<ApiResponse<{ likes: string[] }>> => {
            try {
                const { data } = await axios.post("/posts/reply/like/" + postId, {
                    replyId,
                });

                return data; // Expecting { message, data: { likes } }
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (res, { postId }) => {
            console.log(res);
            queryClient.invalidateQueries({ queryKey: ["post", postId] });
        },
    });
};