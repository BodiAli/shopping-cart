import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { vi, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import routes from "../../router/routes";

const MOCK_GAMES = {
  games: [
    {
      game_id: "1",
      alternate_titles: [
        {
          title: "soccer game",
          description: "another title",
        },
      ],

      title: "Fifa game",
      sample_cover: {
        thumbnail_image: "image.jpg",
      },
      description: "<p>A game where you play soccer</p>",
      genres: [
        {
          genre_category: "Basic genres",
          genre_name: "Sport",
        },
      ],

      platforms: [
        {
          platform_name: "Windows",
          first_release_date: "2012",
        },
      ],
      originalPrice: "50.50",
      sample_screenshots: [
        {
          thumbnail_image: "screenshot.jpg",
        },
      ],
    },

    {
      game_id: "2",
      title: "COD game",
      sample_cover: {},
    },
    {
      game_id: "3",
      title: "Counter-Strike game",
      sample_cover: {},
    },
    {
      game_id: "4",
      title: "Uncharted game",
      sample_cover: {},
    },
    {
      game_id: "5",
      title: "Minecraft game",
      sample_cover: {},
    },
  ],
};
// eslint-disable-next-line no-undef
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: vi.fn(() => Promise.resolve(MOCK_GAMES)),
  })
);

vi.mock("../../utils/fetchData", () => {
  return {
    default: vi.fn(async () => {
      const response = await fetch();
      const data = await response.json();
      return data;
    }),
  };
});

const router = createMemoryRouter(routes);

describe.only("App component", () => {
  test("should go to the product page when a game card is clicked", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);

    // I choose index 2 because Splide library adds 2 empty divs before and after the rendered game cards
    const card = screen.getAllByTestId("home-game-card")[2];
    await user.click(card);

    expect(router.state.location.pathname).toBe("/product/1");
    expect(screen.getByText(/game screenshots/i)).toBeInTheDocument();
  });

  test("should go to shop page when shop link is clicked", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const shopLink = screen.getByRole("link", { name: /shop/i });
    await user.click(shopLink);
    expect(router.state.location.pathname).toBe("/shop/games");
    expect(screen.getByText(/view cart/i)).toBeInTheDocument();
  });

  test("should add game to cart when add to cart button is clicked", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const button = screen.getAllByRole("button", { name: /add to cart/i })[0];
    await user.click(button);
    expect(button).toHaveTextContent(/remove from cart/i);
    expect(screen.getByTestId("quantity")).toHaveTextContent(1);
  });

  test("should go to the product page when a game card is clicked in shop page", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const shopLink = screen.getByRole("link", { name: /shop/i });
    await user.click(shopLink);

    const card = screen.getAllByTestId("shop-game-card")[0];

    await user.click(card);

    expect(router.state.location.pathname).toBe("/product/1");
    expect(screen.getByText(/game screenshots/i)).toBeInTheDocument();
  });

  test("should go to the about page when about link is clicked", async () => {
    const user = userEvent.setup();
    render(<RouterProvider router={router} />);
    const aboutLink = screen.getByRole("link", { name: /about/i });

    await user.click(aboutLink);

    expect(router.state.location.pathname).toBe("/about");
    expect(screen.getByText(/made by bodiali/i)).toBeInTheDocument();
  });
});
