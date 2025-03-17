import { useMutation } from "@tanstack/react-query";
import { followUser, likePost, queryClient, repostPost } from "./http";
import { toast } from "react-toastify";
import {
  updateQueryFollowing,
  updateQueryLikesAllPosts,
  updateQueryLikesPost,
  updateQueryLikesUserProfile,
} from "./queryUpdates";
import type { PostType } from "../types/types";

export const mutateLike = (post: PostType) => {
  return useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: (res) => {
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
      const updatedLikes = res.data;

      updateQueryLikesPost(updatedLikes, post);
      updateQueryLikesAllPosts(updatedLikes, post);
      updateQueryLikesUserProfile(updatedLikes, post);
    },
  });
};

export const mutateRepost = () => {
  return useMutation({
    mutationFn: (postId: string) => repostPost(postId),
    onSuccess: (res) => {
      console.log(res);
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });
};

export const mutateFollow = () => {
  return useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: (res) => {
      console.log(res)
      updateQueryFollowing(res.data)
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });
};
