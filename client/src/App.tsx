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
import { ToastContainer } from "react-toastify";
import type { PropsWithChildren } from "react";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Following from "./_root/pages/Following";
import Search from "./_root/pages/SearchPage";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { authUser } = useAuth();
  if (!authUser) return <Navigate to="/sign-in" replace />;
  return <>{children}</>;
}
function AppRoutes() {
  const { authUser, isLoading } = useAuth();

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route element={<AuthLayout />}>
          <Route
            path="/sign-in"
            element={authUser ? <Navigate to="/" /> : <SigninForm />}
          />

          <Route
            path="/sign-up"
            element={authUser ? <Navigate to="/" /> : <SignupForm />}
          />
        </Route>

        <Route element={<RootLayout />}>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/following"
            element={
              <ProtectedRoute>
                <Following />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search/:query?"
            element={
              <ProtectedRoute>
                <Search />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/posts/:id"
            element={
              <ProtectedRoute>
                <PostPage />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return(
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App;
