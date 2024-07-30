import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import HomePage from "../pages/HomePage/HomePage";

const routes = [
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
        element: <p>HIII</p>,
      },
    ],
  },
];

export default routes;
