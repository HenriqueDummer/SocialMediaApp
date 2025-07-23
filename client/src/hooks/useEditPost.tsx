import { useMutation } from '@tanstack/react-query';
import { PostType } from '../types/types';
import { toast } from 'react-toastify';
import axios from 'axios';

export const useEditPost = (
    { updateFn, closeModal, postId }: { updateFn: (updatedData: PostType) => void, closeModal: () => void, postId: string }
) => {
    return useMutation({
        mutationFn: async (
            formData: PostType
        ): Promise<PostType> => {
            try {
                const { data } = await axios.put(`/posts/edit/${postId}`, formData);
                return data.data as PostType;
            } catch (error: any) {
                console.log(error);
                throw new Error(error.response?.data?.message || "Something went wrong");
            }
        },
        onSuccess: (updatedData: PostType) => {
            updateFn(updatedData);
            toast.success("Post updated!", { theme: "dark", autoClose: 2000 })
            closeModal();
        },
        onError: (error: Error) => {
            console.error("Error updating post:", error);
            toast.error(error.message || "Failed to update post", {
                theme: "dark",
                autoClose: 2000,
            });
        },
    });
}
