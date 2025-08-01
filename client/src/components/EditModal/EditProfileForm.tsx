import { useRef, type ChangeEvent } from "react";
import { FiEdit3 } from "react-icons/fi";
import { Label } from "@radix-ui/react-label";
import TextareaAutosize from "react-textarea-autosize";
import { Input } from "../ui/input";
import type { UserType } from "../../types/types";

const EditProfileForm = ({
  formData,
  onChange,
  onImageChange,
}: {
  formData: UserType;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const profilePicRef = useRef<HTMLInputElement>(null);
  const coverPicRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <div className="relative mt-2">
        <Input
          className="hidden"
          name="profilePicture"
          onChange={(e) => onImageChange(e)}
          ref={profilePicRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
        <Input
          className="hidden"
          name="coverPicture"
          onChange={(e) => onImageChange(e)}
          ref={coverPicRef}
          type="file"
          accept="image/png, image/jpeg, image/jpg"
        />
        <button
          className="relative flex justify-center items-center w-full h-24 rounded-xl bg-slate-600 bg-cover bg-center overflow-hidden hover:opacity-60 transition-opacity duration-200 group"
          style={{
            backgroundImage: `url(${formData.coverPicture})`,
          }}
          onClick={() => coverPicRef.current?.click()}
          aria-label="Edit cover picture"
          type="button"
        >
          <FiEdit3 className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
        </button>

        {/* Profile Picture Button */}
        <button
          className="absolute -bottom-10 left-5 w-20 h-20 rounded-full bg-center bg-cover border-2 border-secondary_bg shadow-lg hover:scale-105 transition-transform duration-200"
          style={{
            backgroundImage: `url(${formData.profilePicture})`,
          }}
          onClick={() => profilePicRef.current?.click()}
          aria-label="Edit profile picture"
          type="button"
        />
      </div>

      <div className="mt-10">
        <p className="mt-2">
          <Label htmlFor="fullName" className="text-slate-200">
            Username
          </Label>
          <Input
            id="fullName"
            type="text"
            name="fullName"
            onChange={(e) => onChange(e)}
            value={formData.fullName || ""}
          />
        </p>
        <p className="mt-2">
          <Label htmlFor="bio" className="text-slate-200">
            Bio
          </Label>
          <TextareaAutosize
            name="bio"
            onChange={(e) => onChange(e)}
            className="w-full mt-3 resize-none text-sm xs:text-base p-2 text-slate-300 focus:outline-none border rounded-lg border-gray-500 bg-transparent"
            value={formData.bio || ""}
          />
        </p>
      </div>
    </>
  );
};

export default EditProfileForm;
