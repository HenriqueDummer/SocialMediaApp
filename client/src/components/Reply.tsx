import type { Reply } from "../types/types";
import Container from "./ui/Container.tsx";
import { NavLink } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { likeReply, queryClient } from "./../utils/http";
import { toast } from "react-toastify";
import { getAuthUser, mutateLikeReply } from "../utils/hooks.ts";

const Reply = ({ replyData, postId }: { replyData: Reply; postId: string }) => {
  const authUser = getAuthUser();

  const onSuccessLike = (res: any) => {
    const liked = res.data.likes.includes(authUser._id);
    toast.success(`Reply ${liked ? "liked" : "disliked"}`, {
      theme: "dark",
      autoClose: 2000,
    });
    queryClient.invalidateQueries({ queryKey: ["post", postId] });
  };

  const { mutate: handleLikeReply } = mutateLikeReply(onSuccessLike)

  const isLiked = replyData.likes.includes(authUser!._id);
  return (
    <Container className="mt-4 px-8 flex justify-between items-center">
      <div className="flex gap-2">
        <NavLink
          to={`/profile/${replyData.user.username}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-14 aspect-square rounded-full bg-center bg-cover"
            style={{
              backgroundImage: `url(${replyData.user.profilePicture})`,
            }}
          ></div>
        </NavLink>
        <div className="ml-4">
          <div>
            <NavLink
              to={`/profile/${replyData.user.username}`}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="items-center gap-2 inline-flex">
                <p className=" font-semibold text-slate-300">
                  {replyData.user.fullName}
                </p>
                <p className="text-sm text-slate-300 opacity-50 font-semibold">
                  @{replyData.user.username}
                </p>
              </div>
            </NavLink>
            <p className="text-slate-400 text-sm">3 hours ago</p>
          </div>
          <div></div>
          <p className=" text-slate-300 py-2">{replyData.text}</p>
        </div>
      </div>

      <div>
        <Button
          onClick={() => handleLikeReply({ replyId: replyData._id, postId })}
          className="bg-transparent border border-gray-600 px-2 py-2 rounded-lg"
        >
          {isLiked ? (
            <IoHeart className="text-red-500" />
          ) : (
            <IoHeartOutline className="text-slate-200" />
          )}
          {replyData.likes.length > 0 && <span>{replyData.likes.length}</span>}
        </Button>
      </div>
    </Container>
  );
};

export default Reply;
