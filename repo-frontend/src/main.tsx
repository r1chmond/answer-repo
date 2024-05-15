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
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
