import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import ErrorPage from "./pages/ErrorPage/ErrorPage.jsx";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import ShopPage from "./pages/ShopPage/ShopPage.jsx";
import Category from "./components/Category/Category.jsx";
import "./reset.css";

//TODO: Implement cart checkout button
//TODO: Implement product page

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
        errorElement: <ErrorComponent />,
      },
      {
        path: "shop",
        element: <ShopPage />,
        children: [
          {
            path: ":category",
            element: <Category />,
            loader: Category.loader,
            errorElement: <ErrorComponent />,
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
