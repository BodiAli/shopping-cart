import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import AboutPage from "../../pages/AboutPage/AboutPage";

const router = createMemoryRouter([
  {
    path: "/",
    element: <AboutPage />,
  },
]);

const wrapper = () => <RouterProvider router={router} />;

describe("AboutPage component", () => {
  test("should render correct elements", () => {
    const { container } = render(<AboutPage />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should change document title", () => {
    render(<AboutPage />, { wrapper });
    expect(document.title).toBe("About | GameVault");
  });

  test("should render website name", () => {
    render(<AboutPage />, { wrapper });
    expect(screen.getByRole("heading", { level: 2, name: /GameVault/ })).toBeInTheDocument();
  });

  test("should render a paragraph that describes the website", () => {
    render(<AboutPage />, { wrapper });
    expect(screen.getByText(/welcome to gamevault, your ultimate destination/i)).toBeInTheDocument();
  });

  test("should render author information", () => {
    render(<AboutPage />, { wrapper });
    const links = screen.getAllByRole("link");

    links.forEach((link) => {
      expect(link).toBeInTheDocument();
    });
    expect(screen.getByText(/made by bodiali/i)).toBeInTheDocument();
  });

  test("should render copyright reserved with the same year", () => {
    render(<AboutPage />, { wrapper });
    const currentDate = new Date();
    expect(
      screen.getByText(`© ${currentDate.getFullYear()} GameVault. All rights reserved.`)
    ).toBeInTheDocument();
  });
});
