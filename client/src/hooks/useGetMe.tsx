import { useQuery } from "@tanstack/react-query";
import { UserType } from "../types/types";
import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";

export const useGetMe = () => {
    const { data, isLoading, error } = useQuery<ApiResponse<UserType>>({
        queryKey: ["authUser"],
        queryFn: async (): Promise<ApiResponse<UserType>> => {
            try {
                const res = await axios.get("/auth/me");

                return res.data ?? { message: "No token found", data: undefined }
            } catch (error: any) {
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
        staleTime: 1000 * 60 * 5,

    });

    const authUser = data?.data;

    return { authUser, isLoading, error };
};