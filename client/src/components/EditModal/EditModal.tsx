import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useMutation } from "@tanstack/react-query";
import type { PostType, UserType } from "../../types/types";
import { Button } from "../ui/button";
import EditProfileForm from "./EditProfileForm";
import EditPostForm from "./EditPostForm";
import { editPost, updateProfile } from "../../utils/http";
import { toast } from "react-toastify";

// Define the mutation functions with proper typing
const getMutationFn = (type: "profile" | "post") => {
  return async (data: UserType | PostType, id?: string) => {
    if (type === "profile") {
      const response = await updateProfile(data as UserType);
      return response.data;
    } else {
      const response = await editPost(data as PostType, id!);
      return response.data;
    }
  };
};

// Separate interfaces for each type
interface BaseEditModalProps {
  children: ReactNode;
}

interface ProfileEditModalProps extends BaseEditModalProps {
  type: "profile";
  initialData: UserType;
  updateFn: (data: UserType) => void;
}

interface PostEditModalProps extends BaseEditModalProps {
  type: "post";
  initialData: PostType;
  updateFn: (data: PostType) => void;
}

type EditModalProps = ProfileEditModalProps | PostEditModalProps;

// Custom hook for form handling
const useEditForm = <T extends UserType | PostType>(initialData: T) => {
  const [formData, setFormData] = useState<T>(initialData);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prev) => ({
          ...prev,
          [e.target.name]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const clearSelectedFile = () => {
    setFormData((prev) => ({ ...prev, selectedFile: "" } as T));
  };

  const resetForm = () => {
    setFormData(initialData);
  };

  return {
    formData,
    handleInputChange,
    handleImageInputChange,
    clearSelectedFile,
    resetForm,
  };
};

// Custom hook for modal state
const useModalState = () => {
  const [open, setOpen] = useState<boolean>(false);

  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return { open, openModal, closeModal };
};

const EditModal = ({
  initialData,
  children,
  updateFn,
  type,
}: EditModalProps) => {
  const { open, openModal, closeModal } = useModalState();
  const {
    formData,
    handleInputChange,
    handleImageInputChange,
    clearSelectedFile,
    resetForm,
  } = useEditForm(initialData);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: UserType | PostType) => 
      getMutationFn(type)(data, initialData._id),
    onSuccess: (updatedData) => {
      updateFn(updatedData);
      closeModal();
      toast.success(`${type === "post" ? "Post" : "Profile"} updated successfully!`, {
        theme: "dark",
        autoClose: 2000,
      });
    },
    onError: (error: Error) => {
      console.error(`Error updating ${type}:`, error);
      toast.error(error.message || `Failed to update ${type}`, {
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

  const renderForm = () => {
    if (type === "profile") {
      return (
        <EditProfileForm
          onChange={handleInputChange}
          onImageChange={handleImageInputChange}
          formData={formData as UserType}
        />
      );
    }
    
    return (
      <EditPostForm
        onChange={handleInputChange}
        onImageChange={handleImageInputChange}
        formData={formData as PostType}
        onDeleteImage={clearSelectedFile}
      />
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild onClick={openModal}>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-light_bg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-slate-200 text-start">
              Edit your {type === "post" ? "post" : "profile"}
            </DialogTitle>
            <div className="mt-2 text-start">
              {renderForm()}
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

export default EditModal;