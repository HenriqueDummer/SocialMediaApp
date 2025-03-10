import type { PostType } from "../types/types";
import type { UserType } from "../types/types";

import { useQuery } from "@tanstack/react-query";

import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { MdOutlineModeComment } from "react-icons/md";

import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import { FiEdit3 } from "react-icons/fi";
import EditModal from "./EditModal";
import { toast } from "react-toastify";

import { MdLoop } from "react-icons/md";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";

import { type ApiResponse } from "../utils/http";
import { updateQueryPostEdit } from "../utils/queryUpdates";
import { mutateLike, mutateRepost } from "../utils/hooks";
import ActionModal from "./ActionModal";
import { useRef } from "react";
import Quote from "./Quote";

const Post = ({ post }: { post: PostType }) => {
  const actionModalRef = useRef<HTMLButtonElement>();
  const { data: { data: authUser } = {} as ApiResponse<UserType> } = useQuery<
    ApiResponse<UserType>
  >({ queryKey: ["authUser"] });

  const { mutate: like } = mutateLike(post);
  const { mutate: repost } = mutateRepost();

  const postData = post.isRepost ? post.originalPost : post;

  const onUpdate = (updatedPost: PostType) => {
    updateQueryPostEdit({ data: updatedPost });

    toast.success(`Post updated`, { theme: "dark", autoClose: 2000 });
  };

  const isLiked = post.likes?.includes(post.user._id);

  const handleLike = (e: any) => {
    e.stopPropagation();
    like(post._id);
  };

  const canEdit = post.user._id === authUser!._id;

  return (
    <Container>
      {post.isRepost && (
        <p className="text-slate-400 flex items-center mb-2">
          <MdLoop />
          Reposted by {post.user.fullName}
        </p>
      )}
      <div className="flex">
        <div>
          <NavLink
            to={`/profile/${postData.user.username}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 aspect-square rounded-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${postData.user.profilePicture})`,
              }}
            ></div>
          </NavLink>
        </div>
        <div className="ml-4 w-full">
          <div className="flex items-center justify-between">
            <div>
              <NavLink
                to={`/profile/${postData.user.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="items-center gap-2 inline-flex">
                  <p className="text-lg font-semibold text-slate-300">
                    {postData.user.fullName}
                  </p>
                  <p className="text-md text-slate-300 opacity-50 font-semibold">
                    @{postData.user.username}
                  </p>
                </div>
              </NavLink>
              <p className="text-slate-400">3 hours ago</p>
            </div>

            <div onClick={(e) => e.stopPropagation()}>
              {canEdit && !post.isRepost && (
                <EditModal
                  initialData={postData}
                  updateFn={onUpdate}
                  type="post"
                >
                  <Button className="text-cyan-600">
                    <FiEdit3 />
                    Edit
                  </Button>
                </EditModal>
              )}
            </div>
          </div>
          <div className="pr-8">
            {postData.text && (
              <p className="text-lg text-slate-300 mt-2">{postData.text}</p>
            )}
            {postData.selectedFile && (
              <img
                className="rounded-lg mt-2"
                src={postData.selectedFile}
                alt="post"
              />
            )}
            {postData.isQuote && (
              <NavLink onClick={(e) => e.stopPropagation()} to={`/posts/${postData.originalPost._id}`}>
                <Quote originalPost={postData.originalPost} />
              </NavLink>
            )}
          </div>

          <div className="flex mt-4 gap-4">
            <Button
              onClick={(e) => handleLike(e)}
              className="bg-slate-700 px-4 py-2 rounded-lg"
            >
              <p className="flex items-center gap-2 text-slate-400">
                {isLiked ? (
                  <IoHeart className="text-xl text-red-500" />
                ) : (
                  <IoHeartOutline className="text-xl" />
                )}
                Like
              </p>
            </Button>
            <div onClick={(e) => e.stopPropagation()}>
              <ActionModal referencePost={postData} type="quote">
                <Button className="hidden" ref={actionModalRef}></Button>
              </ActionModal>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="bg-slate-700 px-4 py-2 rounded-lg flex items-center gap-2 text-slate-400">
                    <MdLoop />
                    Repost
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-light_bg">
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
                      onClick={(e) => {
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

            {/* <Button className="bg-slate-700 px-4 py-2 rounded-lg">
              <p className="flex items-center gap-2 text-slate-400">
                <RxLoop className="text-xl" />
                Repost
              </p>
            </Button> */}
            <Button className="bg-slate-700 px-4 py-2 rounded-lg">
              <p className="flex items-center gap-2 text-slate-400">
                <MdOutlineModeComment />
                Comment
              </p>
            </Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Post;
