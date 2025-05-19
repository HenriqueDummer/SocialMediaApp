import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import SigninForm from "./_auth/forms/SigninForm";
import SignupForm from "./_auth/forms/SignupForm";
import AuthLayout from "./_auth/AuthLayout";
import Home from "./_root/pages/Home";
import Profile from "./_root/pages/Profile";
import RootLayout from "./_root/RootLayout";

import PostPage from "./_root/pages/PostPage";
import { ToastContainer } from "react-toastify";
import { AuthProvider, useAuth } from "./Context/AuthContext";
import Following from "./_root/pages/Following";
import SearchPage from "./_root/pages/SearchPage";
import { setNavigator } from "./utils/navigation";

function AppRoutes() {
  const { authUser, isLoading } = useAuth();

  const navigate = useNavigate();

  setNavigator(navigate);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <>
      <ToastContainer />
      <Routes>
        {!authUser ? (
          <>
            <Route element={<AuthLayout />}>
              <Route path="/sign-in" element={<SigninForm />} />
              <Route path="/sign-up" element={<SignupForm />} />
              <Route path="*" element={<Navigate to="/sign-in" replace />} />
            </Route>
          </>
        ) : (
          <>
            <Route element={<RootLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/following" element={<Following />} />
              <Route path="/search/:query?" element={<SearchPage />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/posts/:id" element={<PostPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </>
        )}
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;
