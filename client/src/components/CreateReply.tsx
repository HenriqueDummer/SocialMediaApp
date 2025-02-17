import { useQuery } from "@tanstack/react-query";

import type { PostType, UserType } from "../types/types";
import { Input } from "./ui/input";

import { FaRegImage } from "react-icons/fa6";
import { IoSend, IoCloseCircle } from "react-icons/io5";
import { Button } from "./ui/button";
import { useRef, useState, type ChangeEvent } from "react";

import { useMutation } from "@tanstack/react-query";
import { createPost, postReply, queryClient } from "./../utils/http";
import Container from "./Container";
import { cn } from './../lib/utils';
import type clsx from "clsx";

const CreateReply = ({postId}: {postId: string}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: handlePostReply } = useMutation({
    mutationFn: ({ postId, text }: { postId: string; text: string }) => postReply(postId, text),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      fileInputRef.current!.value = "";
    },
  });

  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  const handlePost = () => {
    handlePostReply({ postId, text: fileInputRef.current!.value });
  };

  return (
    <Container className="mt-4">
      <p className="text-slate-400">Replying to <span className="text-cyan-600">@rick</span></p>
      <div className="flex mt-2">
        <div>
          <div
            className="w-16 aspect-square rounded-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${authUser!.profilePicture})`,
            }}
          ></div>
        </div>

        <div className="ml-4 w-full flex gap-2 items-center">
          <Input
            className="w-full h-14 !text-lg text-slate-300 border-none"
            ref={fileInputRef}
            placeholder="Post your reply"
          />
          <Button
            onClick={() => handlePost()}
            className="bg-slate-700 text-cyan-600 px-4 rounded-full font-semibold flex items-center"
          >
            Reply
            <IoSend />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CreateReply;
