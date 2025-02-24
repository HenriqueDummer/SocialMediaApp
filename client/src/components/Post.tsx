import type { PostType } from "../types/types";
import type { UserType } from "../types/types";
import { useMutation, useQuery } from "@tanstack/react-query";

import { IoHeartOutline } from "react-icons/io5";
import { IoHeart } from "react-icons/io5";
import { MdOutlineModeComment } from "react-icons/md";
import { RxLoop } from "react-icons/rx";

import { likePost, queryClient } from "../utils/http";
import { Button } from "./ui/button";
import { NavLink } from "react-router-dom";
import Container from "./Container";
import { FiEdit3 } from "react-icons/fi";
import EditModal from "./EditModal";

const Post = ({ post }: { post: PostType }) => {
  const { data: authUser } = useQuery<UserType>({ queryKey: ["authUser"] });

  const { mutate: like } = useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: (updatedLikes) => {
      queryClient.setQueryData(["posts"], (oldData: PostType[]) => {
        return oldData.map((oldPost) => {
          return oldPost._id === post._id
            ? { ...oldPost, likes: updatedLikes.likes }
            : oldPost;
        });
      });
    },
  });

  const isLiked = post.likes?.includes(post.user._id);

  const handleLike = (e: any) => {
    e.stopPropagation();
    like(post._id);
  };

  const canEdit = post.user._id === authUser!._id

  return (
    <Container>
      <div className="flex" onClick={(e) => e.stopPropagation()}>
        <div>
          <NavLink
            to={`/profile/${post.user.username}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="w-16 aspect-square rounded-full bg-center bg-cover"
              style={{
                backgroundImage: `url(${post.user.profilePicture})`,
              }}
            ></div>
          </NavLink>
        </div>
        <div className="ml-4 w-full">
          <div className="flex items-center justify-between">
            <div>
              <NavLink
                to={`/profile/${post.user.username}`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="items-center gap-2 inline-flex">
                  <p className="text-lg font-semibold text-slate-300">
                    {post.user.fullName}
                  </p>
                  <p className="text-md text-slate-300 opacity-50 font-semibold">
                    @{post.user.username}
                  </p>
                </div>
              </NavLink>
              <p className="text-slate-400"> ago</p>
            </div>

            <div>
              {canEdit && (
                <EditModal initialData={post} updateFn={() => {}} type="post">
                  <Button className="text-cyan-600">
                    <FiEdit3 />
                    Edit
                  </Button>
                </EditModal>
              )}
            </div>
          </div>
          {post.text && (
            <p className="text-lg text-slate-300 py-2">{post.text}</p>
          )}
          {post.selectedFile && (
            <img className="rounded-lg" src={post.selectedFile} alt="post" />
          )}
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
            <Button className="bg-slate-700 px-4 py-2 rounded-lg">
              <p className="flex items-center gap-2 text-slate-400">
                <RxLoop className="text-xl" />
                Repost
              </p>
            </Button>
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
