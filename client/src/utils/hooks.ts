import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  following,
  followUser,
  getAllPosts,
  getUserProfile,
  getWhoToFolloe,
  getWhoToFollow,
  likePost,
  likeReply,
  logout,
  postReply,
  queryClient,
  repostPost,
  searchAll,
  searchForUsers,
  type ApiResponse,
} from "./http";
import { toast } from "react-toastify";
import { updateQueryFollowing } from "./queryUpdates";
import type { PostType, UserType } from "../types/types";
import { useNavigate } from "react-router-dom";

export const queryAllPosts = () => {
  const { data: { data: posts } = {} as ApiResponse<PostType[]>, isLoading } =
    useQuery<ApiResponse<PostType[]>>({
      queryKey: ["posts", "all"],
      queryFn: () => getAllPosts("all"),
    });

  return { posts, isLoading };
};

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
};

export const mutateFollow = () => {
  return useMutation({
    mutationFn: (userId: string) => followUser(userId),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ["posts", "following"] });
      queryClient.invalidateQueries({ queryKey: ["following"] });
      queryClient.invalidateQueries({ queryKey: ["who_to_follow"] });
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

export const mutateLikeReply = (onSuccessLike: (res: any) => void) => {
  return useMutation({
    mutationFn: ({ replyId, postId }: { replyId: string; postId: string }) =>
      likeReply(replyId, postId),
    onSuccess: (res: any) => {
      onSuccessLike(res);
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

export const mutateSearchUsers = (
  setResults: (results: UserType[]) => void
) => {
  return useMutation({
    mutationFn: (query: string) => searchForUsers(query),
    onSuccess: (res) => {
      setResults(res.data);
    },
    onError(error) {
      toast.error(error.message, { theme: "dark", autoClose: 2000 });
    },
  });
};

export const mutateSearchAll = (
  onSuccess: (data: { users: UserType[]; posts: PostType[] }) => void
) => {
  return useMutation({
    mutationFn: (query: string) => searchAll(query),
    onSuccess: (res) => {
      onSuccess(res.data);
    },
    onError: (error) => {
      toast.error(error.message, { theme: "dark", autoClose: 2000 });
    },
  });
};

export const mutateLogout = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: logout,
    onSuccess: (res) => {
      queryClient.setQueryData(["authUser"], { data: undefined });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
      navigate("/sign-in");
    },
  });
};

export const queryWhoToFollow = () => {
  const { data: users, isLoading } = useQuery<UserType[]>({
    queryFn: getWhoToFollow,
    queryKey: ["who_to_follow"],
  });

  return { users, isLoading };
};

export const queryFollowing = () => {
  const { data: users, isLoading } = useQuery<UserType[]>({
    queryFn: following,
    queryKey: ["following"],
  });

  return { users, isLoading };
}