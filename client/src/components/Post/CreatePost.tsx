import { useQuery } from "@tanstack/react-query";

import type { PostType, UserType } from "../../types/types";
import { Input } from "../ui/input";
import TextareaAutosize from "react-textarea-autosize";

import { FaRegImage } from "react-icons/fa6";
import { IoSend, IoCloseCircle } from "react-icons/io5";
import { Button } from "../ui/button";
import { useRef, useState, type ChangeEvent } from "react";

import Quote from "./Quote";
import Container from "../ui/Container";
import { useAuthUser, mutateCreatePost } from "../../utils/hooks";

interface CreatePostProps {
  isQuote: boolean;
  originalPost?: PostType | null;
  closeModal?: () => void;
}

const CreatePost = ({ isQuote, originalPost, closeModal }: CreatePostProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const [inputData, setInputData] = useState({
    text: "",
    selectedFile: "",
    originalPost: originalPost ? originalPost._id : null,
    isQuote,
  });

  const clearInputs = () => {
    setInputData({
      text: "",
      selectedFile: "",
      originalPost: null,
      isQuote: false,
    });
  };

  const { mutate: handleCreatePost, isPending } = mutateCreatePost(clearInputs);

  const { authUser } = useAuthUser();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    if (closeModal) {
      closeModal();
    }
    if (inputData.selectedFile) {
      clearSelectedFile();
    }
    if (inputData.text) {
      textAreaRef.current!.value = "";
    }
    handleCreatePost(inputData);
  };

  return (
    <Container className={`pr-8 ${isQuote ? "" : "p-4"}`}>
      <div className="flex">
        <div>
          <div
            className="w-14 aspect-square rounded-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${authUser!.profilePicture})`,
            }}
          ></div>
        </div>
        <TextareaAutosize
          onChange={(e) => handleTextInputChange(e)}
          ref={textAreaRef}
          className="w-full mt-4 ml-2 resize-none text-sm xs:text-base pl-2 text-slate-300 focus:outline-none border-none bg-transparent"
          placeholder={isQuote ? "Add a comment" : "What's happening?"}
        />
      </div>
      <div className="ml-4 w-full">
        {inputData.selectedFile && (
          <div className="rounded-lg overflow-hidden mt-4 relative ">
            <Button
              className="absolute top-2 right-2 bg-slate-700  rounded-full text-4xl opacity-90"
              onClick={() => clearSelectedFile()}
            >
              <IoCloseCircle />
            </Button>
            <img
              className="max-h-[34rem]"
              src={inputData.selectedFile}
              alt=""
            />
          </div>
        )}
        {originalPost && <Quote originalPost={originalPost} />}

        <div className="w-full flex flex-col xs:flex-row justify-between mt-4">
          <Input
            className="hidden text-sm xs:text-base"
            onChange={(e) => handleImageChange(e)}
            ref={fileInputRef}
            type="file"
            accept="image/png, image/jpeg, image/jpg"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="bg-transparent border border-gray-600 px-4 flex items-center text-semibold text-slate-300"
          >
            Add image
            <FaRegImage />
          </Button>
          <div className="flex gap-3 mt-4 xs:mt-0">
            {closeModal && (
              <Button className="grow" variant={"destructive"} onClick={() => closeModal()}>
                Cancel
              </Button>
            )}
            <Button
              onClick={() => handlePost()}
              className="text-sm grow xs:text-base font-semibold px-4 flex items-center bg-gradient-to-r from-blue-600 to-rose-600"
              disabled={
                isPending || (!inputData.text && !inputData.selectedFile)
              }
            >
              {isPending ? (
                "Posting..."
              ) : (
                <>
                  <IoSend className="-rotate-45 -translate-y-[2px]" />
                  Post
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default CreatePost;
