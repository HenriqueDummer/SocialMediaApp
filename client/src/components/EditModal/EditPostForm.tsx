import { useRef, type ChangeEvent } from "react";

import { useQuery } from "@tanstack/react-query";


import TextareaAutosize from "react-textarea-autosize";

import { FaRegImage } from "react-icons/fa6";

import { IoCloseCircle } from "react-icons/io5";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import type { PostType } from "../../types/types";
import PostHeader from "../Post/PostHeader";

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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDeleteImage = () => {
    onDeleteImage();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="bg-light_bg mt-4 rounded-xl">
      <PostHeader postData={formData} actions={false} />
      <div className="w-full">
        <TextareaAutosize
          onChange={(e) => onChange(e)}
          className="w-full mt-4 !text-base md:!text-lg resize-none text-slate-300  bg-transparent focus:outline-none"
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
            className="bg-slate-700 px-4 flex items-center rounded-full mt-4"
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
