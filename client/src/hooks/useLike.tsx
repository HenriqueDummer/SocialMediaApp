import { useMutation } from "@tanstack/react-query";
import { useAuth } from "../Context/AuthContext";
import { updateQueriesOnLike } from "../utils/updateQueries/updateQueriesOnLike";

import { PostType } from "../types/types";
import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";

export const useLike = () => {
    const { authUser } = useAuth();
    return useMutation({
        mutationFn: async (
            postId: string
        ): Promise<ApiResponse<PostType>> => {
            try {
                console.log("Liked " + postId)
                const { data } = await axios.post(`/posts/like/${postId}`);
                return data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onMutate: (postId) => {
            updateQueriesOnLike(postId, authUser!._id)
        },
    });
};