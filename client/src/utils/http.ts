import { QueryClient } from "@tanstack/react-query";
import type { SignInInputSchema } from "../_auth/forms/SigninForm";
import axios from "axios";
import type { PostType, Reply, UserType } from "../types/types";

export const queryClient = new QueryClient();

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// Define a generic response type for backend responses
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
    const { data } = await axios.post("/auth/profile/update", formData);
    return data; // Expecting { message, data: UserType }
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

// -------------------- POSTS ------------------------------

export const getAllPosts = async (): Promise<ApiResponse<PostType[]>> => {
  try {
    const res = await axios.get("/posts");
    return res.data; // Expecting { data: { posts } }
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
}): Promise<ApiResponse<PostType>> => {
  try {
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
    const res = await axios.get(`/posts/user/${username}`);
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
    const { data } = await axios.get(`/posts/${postId}`);
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
  postId: string,
  replyId: string
): Promise<ApiResponse<{ likes: string[] }>> => {
  try {
    const { data } = await axios.post(`/posts/reply/like/${postId}`, {
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
    return data; // Expecting { message, data: PostType }
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
