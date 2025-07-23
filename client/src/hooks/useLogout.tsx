import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../utils/axiosSetup";
import axios from "axios";

export const useLogout = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (): Promise<{ message: string }> => {
            try {
                console.log("Logout");
                const res = await axios.get("/auth/logout");
                return res.data; // Expecting { message }
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: async () => {
            queryClient.setQueryData(["authUser"], { data: undefined });
            await queryClient.cancelQueries();
            queryClient.clear();
            navigate("/sign-in");
        },
    });
};