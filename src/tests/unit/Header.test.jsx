import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Header from "../../components/Header/Header";

const router = createMemoryRouter([
  {
    path: "/",
    element: <Header />,
  },
]);
const wrapper = () => <RouterProvider router={router} />;

describe("Header component", () => {
  test("should render correct elements", async () => {
    const { container } = render(<Header />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should render header element", () => {
    render(<Header />, { wrapper });
    expect(screen.getByRole("banner")).toBeInTheDocument();
  });

  test("should render website name header", () => {
    render(<Header />, { wrapper });
    expect(screen.getByRole("heading", { name: "GameVault" })).toBeInTheDocument();
  });

  test("should render nav links", () => {
    render(<Header />, { wrapper });

    const homeLink = screen.getByRole("link", { name: /home/i });
    const shopLink = screen.getByRole("link", { name: /shop/i });
    const aboutLink = screen.getByRole("link", { name: /about/i });

    expect(homeLink).toBeInTheDocument();
    expect(shopLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();

    expect(homeLink).toHaveAttribute("href", "/");
    expect(shopLink).toHaveAttribute("href", "/shop/games");
    expect(aboutLink).toHaveAttribute("href", "/about");
  });
});
