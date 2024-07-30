import { render, screen } from "@testing-library/react";
import Header from "../../components/Header/Header";
import { createMemoryRouter, RouterProvider } from "react-router-dom";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Header />,
  },
]);
const wrapper = () => <RouterProvider router={router} />;

describe("Header component", () => {
  test("should render correct elements", async () => {
    const { container } = render(<Header />, { wrapper: wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should render header element", () => {
    render(<Header />, { wrapper: wrapper });
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("should render website name header", () => {
    render(<Header />, { wrapper: wrapper });
    expect(screen.getByRole("heading", { name: "GameVault" })).toBeInTheDocument();
  });

  test("should render nav buttons", () => {
    render(<Header />, { wrapper: wrapper });
    expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /about/i })).toBeInTheDocument();
  });
});
