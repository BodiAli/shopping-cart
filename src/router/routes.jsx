import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";
import ErrorComponent from "../components/ErrorComponent/ErrorComponent";
import ShopPage from "../pages/ShopPage/ShopPage";
import Category from "../components/Category/Category";
import ProductPage from "../pages/ProductPage/ProductPage";
import AboutPage from "../pages/AboutPage/AboutPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorComponent />,
        children: [
          {
            index: true,
            element: <HomePage />,
            loader: HomePage.loader,
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
          {
            path: "product/:id",
            element: <ProductPage />,
            loader: ProductPage.loader,
          },
          {
            path: "about",
            element: <AboutPage />,
          },
        ],
      },
    ],
  },
];

export default routes;
