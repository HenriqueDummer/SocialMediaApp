import { useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation } from "@tanstack/react-query";
import type { PostType, UserType } from "../types/types";
import { Button } from "./ui/button";

import EditProfileForm from "./EditProfileForm";
import EditPostForm from "./EditPostForm";
import { editPost, updateProfile } from "../utils/http";

interface EditModalProps<T extends UserType | PostType> {
  initialData: T;
  children: ReactNode;
  updateFn: (data: T) => void;
  type: T extends UserType ? "profile" : "post";
}

const EditModal = <T extends UserType | PostType>({
  initialData,
  children,
  updateFn,
  type,
}: EditModalProps<T>) => {
  const [formData, setFormData] = useState<T>(initialData);
  const [open, setOpen] = useState<boolean>(false);
  const { mutate, isPending } = useMutation({
    mutationFn: (data: T): Promise<T> => {
      if (type === "profile") {
        return updateProfile(data as UserType) as Promise<T>;
      } else {
        return editPost(data as PostType, initialData._id) as Promise<T>;
      }
    },
    onSuccess: (updatedData: T) => {
      // console.log("Updated data => ", updatedData)
      updateFn(updatedData);
      setOpen(false);
    },
    onError: (error) => {
      console.error(`Failed to update ${type}:`, error);
    },
  });

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    console.log("submit   ");
    e.preventDefault();
    mutate(formData);
  };

  return (
    <Dialog open={open}>
      <DialogTrigger className="text-cyan-600" onClick={() => setOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="bg-light_bg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-slate-200">
              Edit your {type === "post" ? "post" : "profile"}
            </DialogTitle>
            <div className="mt-2 pr-10">
              {type === "profile" && (
                <EditProfileForm
                  onChange={handleInputChange}
                  onImageChange={handleImageInputChange}
                  formData={formData as UserType}
                />
              )}
              {type === "post" && (
                <EditPostForm
                  onChange={handleInputChange}
                  onImageChange={handleImageInputChange}
                  formData={formData as PostType}
                />
              )}
            </div>
          </DialogHeader>
          <DialogFooter className="mt-4">
            <Button onClick={() => setOpen(false)} variant={"destructive"} type="button">Cancel</Button>
            <Button
              className="text-cyan-600"
              disabled={isPending}
              type="submit"
            >
              {isPending ? "Updating" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
