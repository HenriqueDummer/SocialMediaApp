import { useMutation } from '@tanstack/react-query';
import { UserType } from '../types/types';
import axios from 'axios';
import { toast } from 'react-toastify';

export const useUpdateProfile = ({ updateFn, closeModal }: { updateFn: (updatedData: UserType ) => void, closeModal: () => void }) => {
    return useMutation({
        mutationFn: async (
            formData: UserType
        ): Promise<UserType> => {
            try {
                console.log("Update profile");
                const { data } = await axios.post("/user/profile/update", formData);
                console.log(data);
                return data.data; // Return only the UserType object
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (updatedData: UserType) => {
            updateFn(updatedData);
            closeModal();
        },
        onError: (error: Error) => {
            console.error("Error updating profile:", error);
            toast.error(error.message || "Failed to update profile", {
                theme: "dark",
                autoClose: 2000,
            });
        },
    });
}
