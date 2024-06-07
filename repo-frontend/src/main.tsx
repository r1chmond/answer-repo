import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./user-pages/HomePage";
import ErrorPage from "./user-pages/ErrorPage";
import ChapterPage from "./user-pages/ChapterPage";
import SolutionPage from "./user-pages/SolutionPage";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Answer from "./components/Answer";
import { loader as solutionListLoader } from "./components/SolutionList";
import { solutionLoader } from "./components/SolutionList";
import BlogPostPage from "./user-pages/BlogPostPage";
import BlogPostForm from "./admin-page/BlogPostForm";
import AdminHomePage from "./admin-page/AdminHomePage";
import AdminLoginPage from "./admin-page/components/AdminLoginPage";
import { AuthProvider } from "./admin-page/AuthContext";
import ProtectedRoute from "./admin-page/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "books/:bookId",
    element: <ChapterPage />,
  },
  {
    path: "books/:bookId/chapters/:chapterId",
    element: <SolutionPage />,
    loader: ({ params }) => solutionListLoader({ params }),
    children: [
      {
        path: "solutions/:solutionId",
        element: <Answer />,
        loader: ({ params }) => solutionLoader({ params }),
      },
    ],
  },
  {
    path: "blogposts/:postId",
    element: <BlogPostPage />,
  },
  {
    path: "answer-repo/admin/blogposts/create",
    element: <BlogPostForm />,
  },
  {
    path: "answer-repo/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "answer-repo/admin/feed",
    element: (
      <ProtectedRoute>
        <AdminHomePage />
      </ProtectedRoute>
    ),
  },
]);

const container = document.getElementById("root")!;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
