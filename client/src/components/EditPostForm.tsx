import { useRef, type ChangeEvent } from "react";
import type { PostType, UserType } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { Input } from "./ui/input";

import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { FaRegImage } from "react-icons/fa6";
import type { ApiResponse } from "../utils/http";
import { IoCloseCircle } from "react-icons/io5";

const EditPostForm = ({
  formData,
  onChange,
  onImageChange,
  onDeleteImage,
}: {
  formData: PostType;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onDeleteImage: () => void;
}) => {
  const { data: { data: authUser } = {} as ApiResponse<UserType> } = useQuery<
    ApiResponse<UserType>
  >({ queryKey: ["authUser"] });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteImage = () => {
    onDeleteImage();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-light_bg mt-4 rounded-xl flex">
      <div>
        <div
          className="w-16 aspect-square rounded-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${authUser!.profilePicture})`,
          }}
        ></div>
      </div>
      <div className="ml-4 w-full">
        <TextareaAutosize
          onChange={(e) => onChange(e)}
          className="w-full mt-4 !text-lg resize-none text-slate-300  bg-transparent focus:outline-none"
          placeholder="What's happening?"
          name="text"
          value={formData.text}
        />
        {formData.selectedFile && (
          <div className="rounded-lg overflow-hidden mt-4 relative">
            <Button
              type="button"
              className="absolute top-2 right-2 bg-slate-700  rounded-full text-4xl opacity-90"
              onClick={() => handleDeleteImage()}
            >
              <IoCloseCircle />
            </Button>
            <img className="w-full" src={formData.selectedFile} alt="" />
          </div>
        )}
        {!formData.selectedFile && (
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="bg-slate-700 px-4 flex items-center rounded-full"
          >
            Add image
            <FaRegImage />
          </Button>
        )}
        <div className="w-full flex justify-between mt-4">
          <Input
            className="hidden"
            onChange={(e) => onImageChange(e)}
            ref={fileInputRef}
            name="selectedFile"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
