import { QueryClient } from "@tanstack/react-query";
import type { LoginInputSchema } from "../_auth/forms/SigninForm";

export const queryClient = new QueryClient();

import axios from "axios";
axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;

export const signin = (data: LoginInputSchema) => {
  axios.post("/auth/sign-in", data).then((res) => {
    console.log(res);
  });
};
