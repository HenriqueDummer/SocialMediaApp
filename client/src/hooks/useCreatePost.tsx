import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../utils/axiosSetup";
import { toast } from "react-toastify";
import { PostType } from "../types/types";
import axios from "axios";
import { ApiResponse } from "../types/ApiResponse";

export const useCreatePost = (clearInputs: () => void) => {
    return useMutation({
        mutationFn: async (postData: {
            text: string;
            selectedFile: string;
            originalPost: string | null;
            isQuote: boolean;
        }): Promise<ApiResponse<PostType>> => {
            try {
                console.log(postData);
                const { data } = await axios.post("/posts", postData);
                return data; // Expecting { message, data: PostType }
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
            clearInputs();
            toast.success(res.message, { theme: "dark", autoClose: 2000 });
        },
        onError: (error) => {
            toast.error(error.message, { theme: "dark", autoClose: 2000 });
        },
    });
};