import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "@tanstack/react-router";

export const useLogout = () => {
    const router = useRouter()

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
            router.invalidate()
        },
    });
};