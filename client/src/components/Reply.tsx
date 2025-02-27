import type { Reply } from "../types/types";
import Container from "./Container";
import { NavLink } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { Button } from "./ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { likeReply, queryClient } from "./../utils/http";
import { UserType } from "./../types/types.ts";
import { toast } from "react-toastify";

const Reply = ({ replyData, postId }: { replyData: Reply; postId: string }) => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  const { mutate: handleLikeReply } = useMutation({
    mutationFn: ({ replyId, postId }: { replyId: string; postId: string }) =>
      likeReply(replyId, postId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      console.log(res.likes)
      const liked = res.likes.includes(authUser?._id!)
      toast(`Reply ${liked ? "liked" : "disliked"}`, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });

  const isLiked = replyData.likes.includes(authUser!._id);

  return (
    <Container className="mt-4 flex justify-between items-center">
      <div className="flex gap-2">
        <NavLink
          to={`/profile/${replyData.user.username}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-16 aspect-square rounded-full bg-center bg-cover"
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
                <p className="text-lg font-semibold text-slate-300">
                  {replyData.user.fullName}
                </p>
                <p className="text-md text-slate-300 opacity-50 font-semibold">
                  @{replyData.user.username}
                </p>
              </div>
            </NavLink>
            <p className="text-slate-400">3 hours ago</p>
          </div>
          <div></div>
          <p className="text-lg text-slate-300 py-2">{replyData.text}</p>
        </div>
      </div>

      <div>
        <Button
          onClick={() => handleLikeReply({ replyId: replyData._id, postId })}
        >
          {isLiked ? (
            <IoHeart className="text-red-500" />
          ) : (
            <IoHeartOutline className="text-slate-200" />
          )}
        </Button>
      </div>
    </Container>
  );
};

export default Reply;
