import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, useRouteError } from "react-router-dom";
import { vi } from "vitest";
import ErrorPage from "../../pages/ErrorPage/ErrorPage";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: vi.fn(() => new Error("Unexpected error occurred")),
  };
});

const router = createMemoryRouter([
  {
    path: "/",
    element: <ErrorPage />,
  },
]);
const wrapper = () => <RouterProvider router={router} />;

describe("Error page", () => {
  test("should render correct elements", () => {
    const { container } = render(<ErrorPage />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should change document title", () => {
    render(<ErrorPage />, { wrapper });
    expect(document.title).toBe("Error");
  });

  test("should render correct heading", () => {
    render(<ErrorPage />, { wrapper });
    expect(screen.getByRole("heading")).toHaveTextContent(/looks like you are lost/i);
  });

  test("should render error message", () => {
    render(<ErrorPage />, { wrapper });
    expect(screen.getByRole("paragraph")).toHaveTextContent("Unexpected error occurred");
  });

  test("should render error data if provided", () => {
    useRouteError.mockReturnValueOnce({ data: "Some detailed error data" });
    render(<ErrorPage />, { wrapper });
    expect(screen.getByText("Some detailed error data")).toBeInTheDocument();
  });

  test("should render a link to head back home", () => {
    render(<ErrorPage />, { wrapper });
    const linkElement = screen.getByRole("link", { name: /head back/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", "/");
  });
});
