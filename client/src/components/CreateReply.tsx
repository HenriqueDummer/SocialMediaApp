import { } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";
import { Button } from "./ui/button";

import { queryClient } from "../utils/axiosSetup";
import Container from "./ui/Container";

import TextareaAutosize from "react-textarea-autosize";
import { useAuth } from "../Context/AuthContext";
import { useState } from "react";
import { useReply } from "../hooks/useReply";

const CreateReply = ({
  postId,
  postAuthor,
}: {
  postId: string;
  postAuthor: string;
}) => {
  const [replyText, setReplyText] = useState<string>("")

  const handleSucceess = () => {
    queryClient.invalidateQueries({ queryKey: ["post", postId] });
    setReplyText("")
  };
  const { mutate: handlePostReply, isPending } =
    useReply(handleSucceess);

  const { authUser } = useAuth();

  const handlePost = () => {
    handlePostReply({ postId, text: replyText });
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
            className="w-full resize-none !text-sm md:!text-base pl-2 text-slate-300 focus:outline-none border-none bg-transparent"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Post your reply"
          />
          <Button
            onClick={() => handlePost()}
            className="!text-sm sm:!text-base font-semibold px-4 rounded-xl flex items-center bg-gradient-to-r from-blue-600 to-rose-600"
            disabled={isPending || replyText.trim() === ""}
          >
            Post
            <IoSend />
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default CreateReply;
