import { useRef, type ChangeEvent } from "react";
import type { PostType, UserType } from "../types/types";
import { useQuery } from "@tanstack/react-query";
import { Input } from "./ui/input";


import TextareaAutosize from "react-textarea-autosize";

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
          className="w-full mt-4 !text-lg resize-none pl-2 text-slate-300 border-none bg-transparent"
          placeholder="What's happening?"
          name="text"
          value={formData.text}
        />
        {formData.selectedFile && (
          <div className="rounded-lg overflow-hidden mt-4 relative">
            <img className="w-full" src={formData.selectedFile} alt="" />
          </div>
        )}
        <div className="w-full flex justify-between mt-4">
          <Input
            className="hidden"
            onChange={(e) => onImageChange(e)}
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
        </div>
      </div>
    </div>
  );
};

export default EditPostForm;
