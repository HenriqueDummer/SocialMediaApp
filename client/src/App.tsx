import { Routes, Route, Navigate } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import RootLayout from "./_root/RootLayout";

import { useQuery } from "@tanstack/react-query";
import type { UserType } from "./types/types";
import { getMe } from "./utils/http";
import PostPage from "./_root/pages/PostPage";

function App() {
  const { data: authUser, isLoading } = useQuery<UserType>({
    queryKey: ["authUser"],
    queryFn: getMe,
    retry: false,
  });


  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
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
