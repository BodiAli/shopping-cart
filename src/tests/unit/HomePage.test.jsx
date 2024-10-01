import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { vi } from "vitest";
import HomePage from "../../pages/HomePage/HomePage";

const games = {
  games: [
    {
      title: "Fifa game",
      sample_cover: {},
    },
    {
      title: "COD game",
      sample_cover: {},
    },
    {
      title: "Minecraft game",
      sample_cover: {},
    },
  ],
};

const MOCK_GAMES = games;

// eslint-disable-next-line no-undef
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: vi.fn(() => Promise.resolve(MOCK_GAMES)),
  })
);

const router = createMemoryRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: HomePage.loader,
  },
]);

const wrapper = () => <RouterProvider router={router} />;

vi.mock("../../utils/generatePrice", () => {
  return {
    default: vi.fn(() => "50.00"),
  };
});

describe("Home page default component", () => {
  test("should render correct elements", () => {
    const { container } = render(<HomePage />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should render an intro header", () => {
    render(<HomePage />, { wrapper });
    expect(screen.getByRole("heading", { name: /welcome to gameVault/i })).toBeInTheDocument();
  });

  test("should render a description of the site", () => {
    render(<HomePage />, { wrapper });
    expect(screen.getByText(/discover a vast selection/i)).toBeInTheDocument();
  });

  test("should render games", () => {
    render(<HomePage />, { wrapper });
    const games = screen.getAllByRole("heading", { name: /game$/i });
    games.forEach((game) => {
      expect(game).toBeInTheDocument();
    });
  });

  test("each game should have a price", () => {
    render(<HomePage />, { wrapper });
    const prices = screen.getAllByText(/50.00/);

    prices.forEach((price) => {
      expect(price).toBeInTheDocument();
    });
  });

  test("should render an image carousel", () => {
    render(<HomePage />, { wrapper });
    const games = screen.getAllByRole("heading", { name: /game$/i });
    expect(screen.getByTestId("carousel")).toBeInTheDocument();
    games.forEach((game) => {
      expect(screen.getByTestId("carousel")).toContainElement(game);
    });
  });

  test("should render a nav that links to shop", () => {
    render(<HomePage />, { wrapper });
    const shopNowLink = screen.getByRole("link", { name: /shop now/i });
    expect(shopNowLink).toBeInTheDocument();
    expect(shopNowLink).toHaveAttribute("href", "/shop/games");
  });
});
