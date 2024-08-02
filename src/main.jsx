import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ShopPage from "./pages/ShopPage/ShopPage.jsx";
import Category from "./components/Category/Category.jsx";
import "./reset.css";

//TODO: Add test for errors in Category component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        loader: HomePage.loader,
        errorElement: <ErrorPage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
        children: [
          {
            path: ":category",
            element: <Category />,
            loader: Category.loader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
