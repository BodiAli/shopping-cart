import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import { vi } from "vitest";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: vi.fn(() => new Error("Failed to fetch")),
  };
});

const router = createMemoryRouter([
  {
    path: "/",
    element: <ErrorComponent />,
  },
]);

const wrapper = () => <RouterProvider router={router} />;

describe("Error component", () => {
  test("should render correct elements", () => {
    const { container } = render(<ErrorComponent />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should render unexpected error occurred", () => {
    render(<ErrorComponent />, { wrapper });
    expect(screen.getByRole("heading")).toHaveTextContent(/unexpected error occurred/i);
  });

  test("should render error message", () => {
    render(<ErrorComponent />, { wrapper });
    expect(screen.getByRole("paragraph")).toHaveTextContent(/failed to fetch/i);
  });

  test("should render a reload button", () => {
    render(<ErrorComponent />, { wrapper });
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});
