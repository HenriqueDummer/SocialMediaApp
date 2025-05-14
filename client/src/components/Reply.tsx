import type { Reply } from "../types/types";
import Container from "./ui/Container.tsx";
import { NavLink } from "react-router-dom";
import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { Button } from "./ui/button.tsx";
import { getAuthUser, mutateLikeReply } from "../utils/hooks.ts";

const Reply = ({ replyData, postId }: { replyData: Reply; postId: string }) => {
  const authUser = getAuthUser();


  const { mutate: handleLikeReply } = mutateLikeReply();

  const isLiked = replyData.likes.includes(authUser!._id);
  return (
    <Container className="mt-4 py-2 lg:px-8 flex justify-between items-center">
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
                <p className="!text-sm md:!text-base font-semibold text-slate-300">
                  {replyData.user.fullName}
                </p>
                <p className="!text-sm hidden lg:inline md:!text-base text-slate-300 opacity-50 font-semibold">
                  @{replyData.user.username}
                </p>
              </div>
            </NavLink>
            <p className="text-slate-400 text-sm">3 hours ago</p>
          </div>
          <div></div>
          <p className=" text-slate-300 py-2 !text-sm md:!text-base">{replyData.text}</p>
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
