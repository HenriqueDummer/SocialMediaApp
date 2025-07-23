import axios from "axios";
import { UserType } from "../types/types";
import { useQuery } from "@tanstack/react-query";


export const useWhoToFollow = () => {
    const { data: users, isLoading } = useQuery<UserType[]>({
        queryFn: async () => {
            try {
                const { data } = await axios.get("/user/who_to_follow");

                return data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        queryKey: ["who_to_follow"],
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });

    return { users, isLoading };
};