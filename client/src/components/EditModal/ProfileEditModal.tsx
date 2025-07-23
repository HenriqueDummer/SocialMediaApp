import { useEditForm } from "../../hooks/useEditForm";
import { ProfileEditModalProps } from "../../types/EditModal";
import { useModalState } from "../../hooks/useModalState";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import EditProfileForm from "./EditProfileForm";
import { Button } from "../ui/button";
import { useUpdateProfile } from "../../hooks/useUpdateProfile";

export const ProfileEditModal = ({ initialData, updateFn, children }: ProfileEditModalProps) => {
    const { open, openModal, closeModal } = useModalState();
    const {
        formData,
        handleInputChange,
        handleImageInputChange,
        resetForm,
    } = useEditForm(initialData);

    const { mutate, isPending } = useUpdateProfile({ updateFn, closeModal })

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