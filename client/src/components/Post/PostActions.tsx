import { IoHeart, IoHeartOutline } from "react-icons/io5";

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
import { useLike } from "../../hooks/useLike";
import { useRepost } from "../../hooks/useRepost";

const PostActions = ({
  postData,
  authUserId,
}: {
  postData: PostType;
  authUserId: string;
}) => {
  const { mutate: like } = useLike();
  const { mutate: repost } = useRepost();

  const handleLike = (e: any) => {
    e.stopPropagation();
    like(postData._id );
  };

  const actionModalRef = useRef<HTMLButtonElement>(null);

  const isLiked = postData.likes?.includes(authUserId);

  return (
    <div className="flex justify-between mt-4 gap-4">
      <Button
        onClick={(e) => handleLike(e)}
        className={`bg-transparent border !text-xs sm:!text-sm  border-gray-600 ${isLiked ? "bg-accent_purple border-none hover:bg-accent_purple/90" : ""
          } !p-0 rounded-lg flex-1`}
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
            <Button className="bg-transparent !text-xs sm:!text-sm border border-gray-600 px-4 py-2 rounded-lg flex items-center gap-2 text-slate-400 w-full">
              <MdLoop />
              Repost
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black rounded-lg border mt-1 border-gray-600 ">
            <DropdownMenuItem className="p-0 border-none ring-0">
              <Button
                onClick={() => repost(postData._id)}
                className="w-full h-full !text-xs sm:!text-sm bg-transparent items-start border-none ring-0"
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
                className="w-full h-full !text-xs sm:!text-sm bg-transparent"
              >
                <FiEdit3 />
                Quote
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Button className="bg-transparent border !text-xs sm:!text-sm border-gray-600 px-0 py-2 rounded-lg flex-1">
        <p className="flex items-center gap-2 text-slate-400">
          <MdOutlineModeComment />
          Comment
        </p>
      </Button>
    </div>
  );
};

export default PostActions;
