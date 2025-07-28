import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/axiosSetup";
import { ApiResponse } from "../types/ApiResponse";
import { UserType } from "../types/types";
import { toast } from "react-toastify";
import axios from "axios";
import { SignUpInputSchema } from "../routes/_auth/_layout.sign-up"; 
import { useNavigate } from "@tanstack/react-router"

export const useSignUp = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (
            data: SignUpInputSchema
        ): Promise<ApiResponse<UserType>> => {
            try {
                const res = await axios.post("/auth/sign-up", data);
                return res.data; // Expecting { message, data: UserType }
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (res) => {
            queryClient.setQueryData(["authUser"], { data: res.data });
            navigate({to: "/"});
            toast.success(res.message, {
                theme: "dark",
                autoClose: 2000,
            });
        },
        onError: (error) => {
            toast.error(error.message, { theme: "dark", autoClose: 4000 });
        },
    });
};