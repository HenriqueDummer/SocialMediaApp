import { useEditForm } from "../../hooks/useEditForm";
import { PostEditModalProps } from "../../types/EditModal";
import { useModalState } from "../../hooks/useModalState";
import { useMutation } from "@tanstack/react-query";
import { editPost } from "../../utils/http";
import { PostType } from "../../types/types";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import EditPostForm from "./EditPostForm";


export const PostEditModal = ({ initialData, updateFn, children }: PostEditModalProps) => {
  const { open, openModal, closeModal, handleOpenChange } = useModalState();
  const {
    formData,
    handleInputChange,
    handleImageInputChange,
    clearSelectedFile,
    resetForm,
  } = useEditForm(initialData);

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: PostType) => {
      const response = await editPost(data, initialData._id);
      return response.data;
    },
    onSuccess: (updatedData: PostType) => {
      updateFn(updatedData);
      toast.success("Post updated!", {theme: "dark", autoClose: 2000})
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleCancel = () => {
    resetForm();
    closeModal();
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild onClick={openModal}>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-light_bg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-slate-200 text-start">
              Edit your post
            </DialogTitle>
            <div className="mt-2 text-start">
              <EditPostForm
                onChange={handleInputChange}
                onImageChange={handleImageInputChange}
                formData={formData}
                onDeleteImage={clearSelectedFile}
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