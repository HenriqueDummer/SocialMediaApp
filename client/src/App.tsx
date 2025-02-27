import { Routes, Route, Navigate } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import RootLayout from "./_root/RootLayout";

import { useQuery } from "@tanstack/react-query";
import type { UserType } from "./types/types";
import { getMe, type ApiResponse } from "./utils/http";
import PostPage from "./_root/pages/PostPage";
import { ToastContainer } from 'react-toastify';

function App() {
  const { data: {data: authUser} = {} as ApiResponse<UserType>, isLoading } = useQuery<ApiResponse<UserType>>({
    queryKey: ["authUser"],
    queryFn: getMe,
    retry: false,
    // refetchOnWindowFocus: false,
    // staleTime: 1000 
  });

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/sign-in"
            element={
              authUser ? <Navigate to="/" /> : <SigninForm />
            }
          />

          <Route
            path="/sign-up"
            element={ authUser ? <Navigate to="/" /> : <SignupForm />}
          />
        </Route>

        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              authUser ? <Home /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/profile/:id"
            element={
              authUser ? <Profile /> : <Navigate to="/sign-in" />
            }
          />
          <Route
            path="/posts/:id"
            element={
              authUser ? <PostPage /> : <Navigate to="/sign-in" />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
