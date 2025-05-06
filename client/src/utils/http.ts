import { QueryClient } from "@tanstack/react-query";
import type { SignInInputSchema } from "../_auth/forms/SigninForm";
import axios from "axios";
import type { PostType, UserType } from "../types/types";
import type { SignUpInputSchema } from "../_auth/forms/SignupForm";
import { toast } from "react-toastify";
import { navigateTo } from "./navigation";

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {  
    if (error.response.request.responseURL === "http://localhost:8000/auth/me")
      return Promise.reject(error);
    if (error.response && error.response.status === 401) {
      queryClient.setQueryData(["authUser"], { data: null });
      navigateTo("/sign-in"); // Redirect to sign-in page
      toast.error("Session expired, please login again", {
        theme: "dark",
        autoClose: 2000,
        onClose: () => {},
      });
    }
    return Promise.reject(error);
  }
);

export type ApiResponse<T> = {
  message?: string;
  data: T;
};

// -------------------- AUTH --------------------------------

export const signIn = async (
  data: SignInInputSchema
): Promise<ApiResponse<UserType>> => {
  try {
    const res = await axios.post("/auth/sign-in", data);
    return res.data; 
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const signUp = async (
  data: SignUpInputSchema
): Promise<ApiResponse<UserType>> => {
  try {
    const res = await axios.post("/auth/sign-up", data);
    return res.data; // Expecting { message, data: UserType }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getMe = async (): Promise<ApiResponse<UserType>> => {
  try {
    const res = await axios.get("/auth/me");
    return res.data ?? null; // Still returning UserType | null from data
  } catch (error: any) {
    console.log(error);
    if (error.response?.status === 401) {
      navigateTo("/sign-in");
    }
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const logout = async (): Promise<{ message: string }> => {
  try {
    console.log("kajsldkajds");
    const res = await axios.get("/auth/logout");
    return res.data; // Expecting { message }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const updateProfile = async (
  formData: UserType
): Promise<ApiResponse<UserType>> => {
  try {
    console.log("Update profile");
    const { data } = await axios.post("/user/profile/update", formData);
    console.log(data);
    return data; // Expecting { message, data: UserType }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

// -------------------- POSTS ------------------------------

export const getAllPosts = async (
  filter: string,
  pageParam: number = 1
): Promise<{data: PostType[], nextPage: number}> => {
  try {
    const { data } = await axios.get("/posts/" + filter + "?page=" + pageParam);
    
    console.log(data)
    
    return {
      data: data.data,
      nextPage: data.nextPage,
    }; 
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const likePost = async (
  postId: string
): Promise<ApiResponse<string[]>> => {
  try {
    const { data } = await axios.post(`/posts/like/${postId}`);
    return data; // Expecting { message, data: { likes } }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const createPost = async (postData: {
  text: string;
  selectedFile: string;
  originalPost: string | null;
  isQuote: boolean;
}): Promise<ApiResponse<PostType>> => {
  try {
    console.log(postData);
    const { data } = await axios.post("/posts", postData);
    return data; // Expecting { message, data: PostType }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getUserProfile = async (
  username: string
): Promise<ApiResponse<{ user: UserType; posts: PostType[] }>> => {
  try {
    const res = await axios.get(`/user/profile/${username}`);
    return res.data; // Expecting { data: { user, posts } }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getPostById = async (
  postId: string
): Promise<ApiResponse<PostType>> => {
  try {
    const { data } = await axios.get(`/posts/post/${postId}`);
    return data; // Expecting { data: PostType }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const postReply = async (
  postId: string,
  text: string
): Promise<ApiResponse<PostType>> => {
  try {
    const { data } = await axios.post(`/posts/reply/${postId}`, { text });
    return data; // Expecting { message, data: PostType }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const likeReply = async (
  replyId: string,
  postId: string
): Promise<ApiResponse<{ likes: string[] }>> => {
  try {
    const { data } = await axios.post("/posts/reply/like/" + postId, {
      replyId,
    });

    return data; // Expecting { message, data: { likes } }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const editPost = async (
  formData: PostType,
  postId: string
): Promise<ApiResponse<PostType>> => {
  try {
    const { data } = await axios.put(`/posts/edit/${postId}`, formData);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const deletePost = async (
  postId: string
): Promise<{ message: string }> => {
  try {
    const { data } = await axios.delete(`/posts/delete/${postId}`);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const repostPost = async (
  postId: string
): Promise<ApiResponse<PostType>> => {
  try {
    const { data } = await axios.post("/posts/repost/" + postId);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

// -------------------- USER ------------------------------

export const followUser = async (userId: string) => {
  try {
    const { data } = await axios.post("/user/follow/" + userId);

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const searchForUsers = async (query: string) => {
  try {
    const { data } = await axios.get(`/user/search/users/${query}`);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const searchAll = async (query: string) => {
  try {
    const { data } = await axios.get("/user/search/" + query);
    console.log(data);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getWhoToFollow = async () => {
  try {
    const { data } = await axios.get("/user/who_to_follow");

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const following = async () => {
  try {
    const { data } = await axios.get("/user/following");

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};
