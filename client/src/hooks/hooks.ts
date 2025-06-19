import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  createPost,
  deletePost,
  following,
  followUser,
  getAllPosts,
  getMe,
  getPostById,
  getUserPosts,
  getUserProfile,
  getWhoToFollow,
  likePost,
  likeReply,
  logout,
  postReply,
  queryClient,
  repostPost,
  searchAll,
  searchForUsers,
  signIn,
  signUp,
  type ApiResponse,
} from "../utils/http";
import { toast } from "react-toastify";
import { updateQueryFollowing, updateQueryLike } from "../utils/queryUpdates";
import type { PostType, UserType } from "../types/types";
import type { SignInInputSchema } from "../_auth/forms/SigninForm";
import { useNavigate } from "react-router-dom";
import type { SignUpInputSchema } from "../_auth/forms/SignupForm";
import { useAuth } from "../Context/AuthContext";

// ----------- User --------------

export const mutateSignin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: SignInInputSchema) => signIn(data),
    onSuccess: (res) => {
      navigate("/");
      queryClient.setQueryData(["authUser"], { data: res.data });
      toast(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message, { theme: "dark", autoClose: 2000 });
    },
  });
};

export const mutateSignup = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (data: SignUpInputSchema) => signUp(data),
    onSuccess: (res) => {
      queryClient.setQueryData(["authUser"], { data: res.data });
      navigate("/");
      toast.success(res.message, {
        theme: "dark",
        autoClose: 2000,
      });
    },
    onError: (error) => {
      toast.error(error.message, { theme: "dark", autoClose: 4000 });
    },
  });
};

export const useAuthUser = () => {
  const { data, isLoading, error } = useQuery<ApiResponse<UserType>>({
    queryKey: ["authUser"],
    queryFn: getMe,
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  // Extract authUser from the ApiResponse structure
  const authUser = data?.data;

  return { authUser, isLoading, error };
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

export const queryUserProfile = (userId: string) => {
  const { data, isLoading } = useQuery<UserType>({
    queryFn: () => getUserProfile(userId!),
    queryKey: ["userProfile", userId],
  });

  return { data, isLoading };
};

export const queryUserPosts = (userId: string) => {
  const { data, isLoading } = useQuery<PostType[]>({
    queryFn: () => getUserPosts(userId),
    queryKey: ["posts", userId],
  });

  return { data, isLoading };
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
    onSuccess: async () => {
      queryClient.setQueryData(["authUser"], { data: undefined });
      await queryClient.cancelQueries();
      queryClient.clear();
      navigate("/sign-in");
    },
  });
};

export const queryWhoToFollow = () => {
  const { data: users, isLoading } = useQuery<UserType[]>({
    queryFn: getWhoToFollow,
    queryKey: ["who_to_follow"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { users, isLoading };
};

// ----------- Posts --------------

export const queryInfinityPosts = (filter: string) => {
  return useInfiniteQuery({
    queryKey: ["posts", filter],
    queryFn: ({ pageParam }) => getAllPosts(filter, pageParam),
    getNextPageParam: (lastPage) => lastPage.nextPage,
    initialPageParam: 1,
    staleTime: 1000 * 60,
  });
};

export const queryFollowing = () => {
  const { data: users, isLoading } = useQuery<UserType[]>({
    queryFn: following,
    queryKey: ["following"],
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });

  return { users, isLoading };
};

export const queryPost = (postId: string) => {
  const { data: { data: postData } = {} as ApiResponse<PostType>, isLoading } =
    useQuery<ApiResponse<PostType>>({
      queryFn: () => getPostById(postId),
      queryKey: ["post", postId],
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    });

  return { postData, isLoading };
};

export const mutateLike = () => {
  const { authUser } = useAuth();
  return useMutation({
    mutationFn: ({ postId }: { postId: string; userId: string }) =>
      likePost(postId),
    onMutate: ({ postId }) => {
      queryClient.setQueriesData({ queryKey: ["posts"] }, (old: any) =>
        updateQueryLike(old, postId, authUser!._id)
      );
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
    onError: (error) => {
      toast.error(error.message, { theme: "dark", autoClose: 2000 });
    },
  });
};

export const mutateLikeReply = () => {
  return useMutation({
    mutationFn: ({ replyId, postId }: { replyId: string; postId: string }) =>
      likeReply(replyId, postId),
    onSuccess: (res, { postId }) => {
      console.log(res);
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
    },
  });
};
