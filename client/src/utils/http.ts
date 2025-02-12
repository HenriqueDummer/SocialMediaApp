import { QueryClient } from "@tanstack/react-query";
import type { LoginInputSchema } from "../_auth/forms/SigninForm";

export const queryClient = new QueryClient();

import axios from "axios";
import type { PostType } from "../types/types";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

// -------------------- AUTH --------------------------------

export const signIn = async (data: LoginInputSchema) => {
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

export const createPost = async (postData): Promise<PostType> => {
  try {
    const {data} = await axios.post("/posts", postData);
    return data;
  } catch (error: any) {
    console.log(error);
    throw new Error(error.response?.data?.message || "Something went wrong");
  }
}
