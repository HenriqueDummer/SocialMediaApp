import { Routes, Route, Navigate } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import Home from "./_root/pages/Home";
import RootLayout from "./_root/RootLayout";

import { useQuery } from "@tanstack/react-query";
import type { User } from "./types/types";
import { getMe } from "./utils/http";

function App() {
  const { data: authUser, isLoading } = useQuery<User>({
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
        </Route>
      </Routes>
    </>
  );
}

export default App;
