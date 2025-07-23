import { useMutation } from "@tanstack/react-query";
import { PostType, UserType } from "../types/types";
import { toast } from "react-toastify";
import axios from "axios";

export const useSearchAll = (
    onSuccess: (data: { users: UserType[]; posts: PostType[] }) => void
) => {
    return useMutation({
        mutationFn: async (query: string) => {
            try {
                const { data } = await axios.get("/user/search/" + query);
                console.log(data);
                return data;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (res) => {
            onSuccess(res.data);
        },
        onError: (error) => {
            toast.error(error.message, { theme: "dark", autoClose: 2000 });
        },
    });
};