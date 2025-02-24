import { useState, type ChangeEvent, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation, useQuery } from "@tanstack/react-query";
import type { PostType, UserType } from "../types/types";
import { Button } from "./ui/button";

import EditProfileForm from "./EditProfileForm";
import EditPostForm from "./EditPostForm";
import { updateProfile } from "../utils/http";
import { updatePost } from "./../utils/http";

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

  const { mutate, isPending } = useMutation({
    mutationFn: (data: T): Promise<T> => {
      if (type === "profile") {
        return updateProfile(data as UserType) as Promise<T>;
      } else {
        return updatePost(data as PostType) as Promise<T>;
      }
    },
    onSuccess: (updatedData: T) => {
      updateFn(updatedData)
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
    <Dialog>
      <DialogTrigger className="text-cyan-600">{children}</DialogTrigger>
      <DialogContent className="bg-light_bg">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-slate-200">
              Edit your {type === "post" ? "post" : "profile"}
            </DialogTitle>
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
          </DialogHeader>
          <DialogFooter>
            <Button className="text-cyan-600 mt-4" disabled={isPending} type="submit">
              {isPending ? "Updating" : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditModal;
