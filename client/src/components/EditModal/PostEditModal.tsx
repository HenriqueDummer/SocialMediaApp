import { useEditForm } from "../../hooks/useEditForm";
import { PostEditModalProps } from "../../types/EditModal";
import { useModalState } from "../../hooks/useModalState";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";
import EditPostForm from "./EditPostForm";
import { useEditPost } from "../../hooks/useEditPost";


export const PostEditModal = ({ initialData, updateFn, children }: PostEditModalProps) => {
  const { open, openModal, closeModal, handleOpenChange } = useModalState();
  const {
    formData,
    handleInputChange,
    handleImageInputChange,
    clearSelectedFile,
    resetForm,
  } = useEditForm(initialData);

  const { mutate, isPending } = useEditPost({ updateFn, closeModal, postId: initialData._id })

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
              className="bg-accent_purple hover:bg-accent_purple/90 grow h-10 lg:flex-none"
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