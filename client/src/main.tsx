import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./utils/axiosSetup.ts";
import { RouterProvider, createRouter } from '@tanstack/react-router'

import "./output.css";

// Import the generated route tree
import { routeTree } from './routeTree.gen'
import { AuthProvider } from "./Context/AuthContext.tsx";
import { ToastContainer } from "react-toastify";

// Create a new router instance
const router = createRouter({ routeTree })

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </AuthProvider>
  </QueryClientProvider>
);
