import { useQuery } from "@tanstack/react-query";
import { UserType } from "../types/types";
import axios from "axios";

export const useUserProfile = (userId: string) => {

    const { data, isLoading } = useQuery<UserType>({
        queryKey: ["userProfile", userId],
        queryFn: async ({ queryKey }): Promise<UserType> => {
            const [, userId] = queryKey
            try {
                const res = await axios.get(`/user/profile/${userId}`);
                return res.data.data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
    });

    return { data, isLoading };
};