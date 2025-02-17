import { QueryClient } from "@tanstack/react-query";
import type { SignInInputSchema } from "../_auth/forms/SigninForm";

export const queryClient = new QueryClient();

import axios from "axios";
import type { PostType, Reply, UserType } from "../types/types";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// -------------------- AUTH --------------------------------

export const signIn = async (data: SignInInputSchema) => {
  try {
    const res = await axios.post("/auth/sign-in", data);
    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getMe = async () => {
  try {
    const res = await axios.get("/auth/me");
    return res.data.user ?? null;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const logout = async () => {
  try {
    const res = await axios.get("/auth/logout");
    console.log(res);

    return res;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

// -------------------- POSTS ------------------------------

export const getAllPosts = async () => {
  try {
    const res = await axios.get("/posts");
    return res.data.posts;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const likePost = async (postId: string) => {
  try {
    const { data } = await axios.post(`/posts/${postId}/like`);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const createPost = async (postData: {
  text: string;
  selectedFile: string;
}): Promise<PostType> => {
  try {
    const { data } = await axios.post("/posts", postData);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getUserProfile = async (
  id: string
): Promise<{ user: UserType; userPosts: PostType[] }> => {
  try {
    const res = await axios.get("/posts/user/" + id);
    return res.data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const getPostById = async (postId: string): Promise<PostType> => {
  try {
    const { data } = await axios.get("/posts/" + postId);
    console.log(data)
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
};

export const postReply = async (postId: string, text: string): Promise<Reply> => {
  try {
    const {data} = await axios.post("/posts/reply/" + postId, {text});

    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}