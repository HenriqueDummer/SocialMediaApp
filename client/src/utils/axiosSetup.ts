import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-toastify";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error.response.request.responseURL ===
      import.meta.env.VITE_BASE_URL + "/auth/me"
    )
      return Promise.reject(error);
    if (error.response && error.response.status === 401) {
      queryClient.setQueryData(["authUser"], { data: null });
      toast.error("Session expired, please login again", {
        theme: "dark",
        autoClose: 2000,
        onClose: () => { },
      });
    }
    return Promise.reject(error);
  }
);


