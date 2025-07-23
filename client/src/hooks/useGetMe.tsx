import { useQuery } from "@tanstack/react-query";
import { UserType } from "../types/types";
import axios from "axios";
import { navigateTo } from "../utils/navigation";
import { ApiResponse } from "../types/ApiResponse";

export const useGetMe = () => {
    const { data, isLoading, error } = useQuery<ApiResponse<UserType>>({
        queryKey: ["authUser"],
        queryFn: async (): Promise<ApiResponse<UserType>> => {
            try {
                const token = localStorage.getItem('token')
                if (!token) return { message: "No token found", data: undefined };

                const res = await axios.get("/auth/me");
                return res.data ?? { message: "No token found", data: undefined }
            } catch (error: any) {
                if (error.response?.status === 401) {
                    navigateTo("/sign-in");
                }
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        retry: false,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: false,
    });

    // Extract authUser from the ApiResponse structure
    const authUser = data?.data;

    return { authUser, isLoading, error };
};