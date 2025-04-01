import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { mutateLike, mutateRepost } from "../../utils/hooks";

import { MdLoop, MdOutlineModeComment } from "react-icons/md";
import { FiEdit3 } from "react-icons/fi";
import { Button } from "../ui/button";

import ActionModal from "../ActionModal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

import type { PostType } from "../../types/types";
import { useRef } from "react";

const PostActions = ({
  postData,
  authUserId,
}: {
  postData: PostType;
  authUserId: string;
}) => {
  const actionModalRef = useRef<HTMLButtonElement>(null);

  const { mutate: like } = mutateLike(postData);
  const { mutate: repost } = mutateRepost();

  const isLiked = postData.likes?.includes(authUserId);

  const handleLike = (e: any) => {
    e.stopPropagation();
    like(postData._id);
  };

  return (
    <div className="flex justify-between mt-4 gap-4">
      <Button
        onClick={(e) => handleLike(e)}
        className={`bg-transparent border  border-gray-600 ${isLiked ? "bg-red-500 border-none hover:bg-red-500" : ""} !p-0 rounded-lg flex-1`}
      >
        <p className={`flex gap-2 w-full justify-center items-center`}>
            {isLiked ? (
              <IoHeart className="text-3xl" />
            ) : (
              <IoHeartOutline className="text-3xl" />
            )}
            {postData.likes.length}
        </p>
      </Button>
      <div className="flex-1" onClick={(e) => e.stopPropagation()}>
        <ActionModal referencePost={postData} type="quote">
          <Button className="hidden" ref={actionModalRef}></Button>
        </ActionModal>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="bg-transparent border border-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 text-slate-400 w-full">
              <MdLoop />
              Repost
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-light_bg rounded-lg">
            <DropdownMenuItem className="p-0">
              <Button
                onClick={() => repost(postData._id)}
                className="w-full h-full bg-transparent items-start"
              >
                <MdLoop />
                Repost
              </Button>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-0">
              <Button
                onClick={() => {
                  actionModalRef.current!.click();
                }}
                className="w-full h-full bg-transparent"
              >
                <FiEdit3 />
                Quote
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button className="bg-transparent border border-gray-600 px-0 py-2 rounded-lg flex-1">
        <p className="flex items-center gap-2 text-slate-400">
          <MdOutlineModeComment />
          Comment
        </p>
      </Button>
    </div>
  );
};

export default PostActions;
