import { useInfiniteQuery } from "@tanstack/react-query";
import { PostType } from "../types/types";
import axios from "axios";

export const useInfinitPosts = (filter: string) => {
    return useInfiniteQuery({
        queryKey: ["posts", filter],
        queryFn: async ({ pageParam, queryKey }): Promise<{ data: PostType[]; nextPage: number }> => {
            try {
                const [, filter] = queryKey
                const { data } = await axios.get("/posts/" + filter + "?page=" + pageParam);

                return {
                    data: data.data,
                    nextPage: data.nextPage,
                };
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        getNextPageParam: (lastPage) => lastPage.nextPage,
        initialPageParam: 1,
        staleTime: 1000 * 60,
    });
};