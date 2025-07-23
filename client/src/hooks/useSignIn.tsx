import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { SignInInputSchema } from "../_auth/forms/SigninForm";
import { queryClient } from "../utils/axiosSetup";
import { ApiResponse } from "../types/ApiResponse";
import { UserType } from "../types/types";
import { toast } from "react-toastify";
import axios from "axios";

export const useSignIn = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: async (
            data: SignInInputSchema
        ): Promise<ApiResponse<UserType>> => {
            try {
                const res = await axios.post("/auth/sign-in", data);
                return res.data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (res) => {
            navigate("/");
            queryClient.setQueryData(["authUser"], { data: res.data });
            toast(res.message, {
                theme: "dark",
                autoClose: 2000,
            });
        },
        onError: (error) => {
            toast.error(error.message, { theme: "dark", autoClose: 2000 });
        },
    });
};