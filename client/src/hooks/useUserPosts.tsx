import { useQuery } from "@tanstack/react-query";
import { PostType } from "../types/types";
import axios from "axios";

export const useUserPosts = (userId: string) => {
    const { data, isLoading } = useQuery<PostType[]>({
        queryKey: ["posts", userId],
        queryFn: async ({ queryKey }): Promise<PostType[]> => {
            const [, userId] = queryKey
            try {
                const res = await axios.get("/posts/" + userId);
                return res.data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
    });

    return { data, isLoading };
};