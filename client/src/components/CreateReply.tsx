import {} from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { Button } from "./ui/button";
import { useRef } from "react";

import { queryClient } from "./../utils/http";
import Container from "./ui/Container";


import TextareaAutosize from "react-textarea-autosize";
import { getAuthUser, mutateCreateReply } from "../utils/hooks";

const CreateReply = ({
  postId,
  postAuthor,
}: {
  postId: string;
  postAuthor: string;
}) => {
  const fileInputRef = useRef<HTMLTextAreaElement>(null);

  const handleSucceess = () => {
    queryClient.invalidateQueries({ queryKey: ["post", postId] });
    fileInputRef.current!.value = "";
  };
  const { mutate: handlePostReply } = mutateCreateReply(handleSucceess);

  const authUser = getAuthUser();

  const handlePost = () => {
    handlePostReply({ postId, text: fileInputRef.current!.value });
  };

  return (
    <Container className="mt-4 px-8">
      <p className="text-slate-400 text-sm">
        Replying to <span className="text-cyan-600">@{postAuthor}</span>
      </p>
      <div className="flex mt-2">
        <div>
          <div
            className="w-14 aspect-square rounded-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${authUser!.profilePicture})`,
            }}
          ></div>
        </div>

        <div className="ml-4 w-full flex gap-2 items-center">
          <TextareaAutosize
            className="w-full resize-none pl-2 text-slate-300 focus:outline-none border-none bg-transparent"
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
