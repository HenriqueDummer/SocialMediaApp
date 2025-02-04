import { QueryClient } from "@tanstack/react-query";
import type { LoginInputSchema } from "../_auth/forms/SigninForm";

export const queryClient = new QueryClient();

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const signIn = async (data: LoginInputSchema) => {
  const res = await axios.post("/auth/sign-in", data)

  console.log(res)
};

export const getMe = async () => {
  const res = await axios.get("/auth/me")
    
  console.log(res.data)
}
