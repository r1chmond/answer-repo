import React from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./user_pages/HomePage";
import ErrorPage from "./user_pages/ErrorPage";
import BookPage from "./user_pages/BookPage";
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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
