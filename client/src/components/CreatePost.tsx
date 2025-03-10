import { useQuery } from "@tanstack/react-query";

import type { PostType, UserType } from "../types/types";
import { Input } from "./ui/input";
import TextareaAutosize from "react-textarea-autosize";

import { FaRegImage } from "react-icons/fa6";
import { IoSend, IoCloseCircle } from "react-icons/io5";
import { Button } from "./ui/button";
import { useRef, useState, type ChangeEvent } from "react";

import { useMutation } from "@tanstack/react-query";
import { createPost, queryClient, type ApiResponse } from "./../utils/http";
import { toast } from "react-toastify";
import Quote from "./Quote";

interface CreatePostProps {
  isQuote: boolean;
  originalPost: PostType | null;
  closeModal?: () => void;
}

const CreatePost = ({ isQuote, originalPost, closeModal }: CreatePostProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [inputData, setInputData] = useState({
    text: "",
    selectedFile: "",
    originalPost: originalPost ? originalPost._id : null,
    isQuote
  });

  const { mutate: handleCreatePost, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      setInputData({
        text: "",
        selectedFile: "",
        originalPost: null,
        isQuote: false,
      });
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
    },
    onError: (error) => {
      toast.error(error.message, { theme: "dark", autoClose: 2000 });
    },
  });

  const { data: { data: authUser } = {} as ApiResponse<UserType>, isLoading } =
    useQuery<ApiResponse<UserType>>({ queryKey: ["authUser"] });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setInputData((prev) => ({
          ...prev,
          selectedFile: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputData((prev) => ({
      ...prev,
      text: e.target.value,
    }));
  };

  const clearSelectedFile = () => {
    setInputData((prev) => ({ ...prev, selectedFile: "" }));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handlePost = () => {
    handleCreatePost(inputData);
    if(closeModal) closeModal();
    if (inputData.selectedFile) clearSelectedFile();
    setInputData((prev) => ({ ...prev, text: "" }));
  };


  return (
    <div className={`bg-light_bg ${isQuote ? "" : "p-4"} rounded-xl flex`}>
      <div>
        <div
          className="w-12 aspect-square rounded-full bg-center bg-cover"
          style={{
            backgroundImage: `url(${authUser!.profilePicture})`,
          }}
        ></div>
      </div>
      <div className="ml-4 w-full">
        <TextareaAutosize
          onChange={(e) => handleTextInputChange(e)}
          className="w-full mt-2 !text-lg resize-none pl-2 text-slate-300 focus:outline-none border-none bg-transparent"
          placeholder={isQuote ? "Add a comment" : "What's happening?"}
        />
        {inputData.selectedFile && (
          <div className="rounded-lg overflow-hidden mt-4 relative">
            <Button
              className="absolute top-2 right-2 bg-slate-700  rounded-full text-4xl opacity-90"
              onClick={() => clearSelectedFile()}
            >
              <IoCloseCircle />
            </Button>
            <img className="w-full" src={inputData.selectedFile} alt="" />
          </div>
        )}
        {originalPost && <Quote originalPost={originalPost} />}

        <div className="w-full flex justify-between mt-4">
          <Input
            className="hidden"
            onChange={(e) => handleInputChange(e)}
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="!bg-slate-700 px-4 flex items-center rounded-full text-semibold text-cyan-600"
          >
            Add image
            <FaRegImage />
          </Button>

          <div className="flex gap-3">
            {closeModal && (
              <Button variant={"destructive"} onClick={() => closeModal()}>
                Cancel
              </Button>
            )}
            <Button
              onClick={() => handlePost()}
              className="!bg-slate-700 text-cyan-600 px-4 flex items-center"
              disabled={isPending || (!inputData.text && !inputData.selectedFile)}
            >
              {isPending ? (
                "Posting..."
              ) : (
                <>
                  Post
                  <IoSend />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
