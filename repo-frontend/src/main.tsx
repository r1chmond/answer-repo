import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./user-pages/HomePage";
import ErrorPage from "./user-pages/ErrorPage";
import BookPage from "./user-pages/BookPage";
import SolutionPage from "./user-pages/SolutionPage";
import "bootstrap/dist/css/bootstrap.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "books/:bookId",
    element: <BookPage />,
  },
  { path: "books/:bookId/chapters/:chapterId", element: <SolutionPage /> },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
