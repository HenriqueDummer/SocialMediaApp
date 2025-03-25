import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  followUser,
  getUserProfile,
  likePost,
  postReply,
  queryClient,
  repostPost,
  type ApiResponse,
} from "./http";
import { toast } from "react-toastify";
import {
  updateQueryFollowing,
  updateQueryLikesAllPosts,
  updateQueryLikesPost,
  updateQueryLikesUserProfile,
} from "./queryUpdates";
import type { PostType, UserType } from "../types/types";

export const getAuthUser = () => {
  const { data: { data: authUser } = {} as ApiResponse<UserType> } = useQuery<
    ApiResponse<UserType>
  >({ queryKey: ["authUser"] });

  return authUser;
};

export const mutateLike = (post: PostType) => {
  return useMutation({
    mutationFn: (postId: string) => likePost(postId),
    onSuccess: (res) => {
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
      const updatedLikes = res.data;

      // updateQueryLikesPost(updatedLikes, post);
      // updateQueryLikesAllPosts(updatedLikes, post);
      // updateQueryLikesUserProfile(updatedLikes, post);
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["profile"] });
      queryClient.invalidateQueries({ queryKey: ["post", post._id] });

    },
  });
};

export const mutateRepost = () => {
  return useMutation({
    mutationFn: (postId: string) => repostPost(postId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });
};

export const mutateDelete = () => {
  return useMutation({
    mutationFn: (postId: string) => deletePost(postId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
      queryClient.invalidateQueries({ queryKey: ["posts", "all"] });
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });
}

export const mutateFollow = () => {
  return useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
      updateQueryFollowing(res.data);
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
    },
  });
};

export const mutateCreatePost = (clearInputs: () => void) => {
  return useMutation({
    mutationFn: createPost,
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      clearInputs();
      toast.success(res.message, { theme: "dark", autoClose: 2000 });
    },
    onError: (error) => {
      toast.error(error.message, { theme: "dark", autoClose: 2000 });
    },
  });
};

export const mutateCreateReply = (handleSuccess: () => void) => {
  return useMutation({
    mutationFn: ({ postId, text }: { postId: string; text: string }) =>
      postReply(postId, text),
    onSuccess: () => {
      handleSuccess();
      toast.success("Reply posted", { theme: "dark", autoClose: 2000 });
    },
  });
};

export const queryUserProfile = (username: string) => {
  const {
    data: { data: userProfile } = {} as ApiResponse<{
      user: UserType;
      posts: PostType;
    }>,
    isLoading,
  } = useQuery<ApiResponse<{ user: UserType; posts: PostType[] }>>({
    queryFn: () => getUserProfile(username!),
    queryKey: ["userProfile"],
  });

  return { userProfile, isLoading };
};
