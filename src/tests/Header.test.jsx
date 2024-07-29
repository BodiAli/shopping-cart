import { render, screen } from "@testing-library/react";
import Header from "../components/Header/Header";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../router/routes";
import { expect } from "vitest";

const router = createMemoryRouter(routes);
const wrapper = () => <RouterProvider router={router}></RouterProvider>;

describe("Header component", () => {
  test("should render correct elements", () => {
    const { container } = render(<Header />, { wrapper: wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should render header element", () => {
    render(<Header />, { wrapper: wrapper });
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  test("should render home button", () => {
    render(<Header />, { wrapper: wrapper });
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
  });
});
