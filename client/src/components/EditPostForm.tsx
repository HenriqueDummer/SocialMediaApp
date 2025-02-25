import { useRef, type ChangeEvent } from "react";
import type { PostType, UserType } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { Input } from "./ui/input";

import TextareaAutosize from "react-textarea-autosize";
import { Button } from "./ui/button";
import { FaRegImage } from "react-icons/fa6";

const EditPostForm = ({
  formData,
  onChange,
  onImageChange,
}: {
  formData: PostType;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  const fileInputRef = useRef<HTMLInputElement>(null);

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
          <div className="rounded-lg overflow-hidden mt-4 relative cursor-pointer " onClick={() => fileInputRef.current!.click()}>
            <img className="w-full duration-200 hover:opacity-60" src={formData.selectedFile} alt="" />
          </div>
        )}
        {!formData.selectedFile && (
          <Button
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
