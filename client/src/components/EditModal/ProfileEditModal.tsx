
import { useEditForm } from "../../hooks/useEditForm";
import { ProfileEditModalProps } from "../../types/EditModal";
import { useModalState } from "../../hooks/useModalState";
import { useMutation } from "@tanstack/react-query";
import { updateProfile } from "../../utils/http";
import { UserType } from "../../types/types";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import EditProfileForm from "./EditProfileForm";
import { Button } from "../ui/button";

export const ProfileEditModal = ({ initialData, updateFn, children }: ProfileEditModalProps) => {
    const { open, openModal, closeModal } = useModalState();
    const {
        formData,
        handleInputChange,
        handleImageInputChange,
        resetForm,
    } = useEditForm(initialData);

    const { mutate, isPending } = useMutation({
        mutationFn: async (data: UserType) => {
            const response = await updateProfile(data);
            return response.data;
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

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutate(formData);
    };

    const handleCancel = () => {
        resetForm();
        closeModal();
    };

    return (
        <Dialog open={open} onOpenChange={openModal}>
            <DialogTrigger asChild onClick={openModal}>
                {children}
            </DialogTrigger>
            <DialogContent className="bg-light_bg">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle className="text-slate-200 text-start">
                            Edit your profile
                        </DialogTitle>
                        <div className="mt-2 text-start">
                            <EditProfileForm
                                onChange={handleInputChange}
                                onImageChange={handleImageInputChange}
                                formData={formData}
                            />
                        </div>
                    </DialogHeader>
                    <DialogFooter className="mt-4 flex flex-row justify-end gap-5 lg:gap-0">
                        <Button
                            onClick={handleCancel}
                            variant="destructive"
                            type="button"
                            className="grow h-10 lg:flex-none"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="text-cyan-600 grow h-10 lg:flex-none"
                            disabled={isPending}
                            type="submit"
                        >
                            {isPending ? "Updating..." : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};