import { useQuery } from "@tanstack/react-query";
import { PostType } from "../types/types";
import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";

export const usePost = (postId: string) => {
    const { data: { data: postData } = {} as ApiResponse<PostType>, isLoading } =
        useQuery<ApiResponse<PostType>>({
            queryKey: ["post", postId],
            queryFn: async ({ queryKey }): Promise<ApiResponse<PostType>> => {
                const [, postId] = queryKey
                try {
                    const { data } = await axios.get(`/posts/post/${postId}`);
                    return data; // Expecting { data: PostType }
                } catch (error: any) {
                    console.log(error);
                    throw new Error(error.response?.data?.message || "Something went wrong");
                }
            },
            refetchOnWindowFocus: false,
            refetchOnMount: false,
        });

    return { postData, isLoading };
};