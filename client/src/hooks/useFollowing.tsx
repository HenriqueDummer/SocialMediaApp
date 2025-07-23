import { useQuery } from "@tanstack/react-query";
import { UserType } from "../types/types";
import axios from "axios";

export const useFollowing = () => {
    const { data: users, isLoading } = useQuery<UserType[]>({
        queryFn: async () => {
            try {
                const { data } = await axios.get("/user/following");

                return data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        queryKey: ["following"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { users, isLoading };
};