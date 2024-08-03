import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { vi } from "vitest";
import Category from "../../components/Category/Category";

const MOCK_GAMES = {
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
const MOCK_ACTION = {
  games: [
    {
      title: "CSGO action",
      sample_cover: {},
    },
    {
      title: "COD action",
      sample_cover: {},
    },
    {
      title: "TF2 action",
      sample_cover: {},
    },
  ],
};

Category.loader = vi.fn(({ params }) => {
  switch (params.category) {
    case "games":
      return MOCK_GAMES.games;

    case "action":
      return MOCK_ACTION.games;
    default:
      return null;
  }
});

const routes = [
  {
    path: "/:category",
    element: <Category />,
    loader: Category.loader,
  },
];

function createTestWrapper(initialIndex) {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/games", "/action"],
    initialIndex,
  });

  return function wrapper() {
    return <RouterProvider router={router} />;
  };
}
const wrapper = createTestWrapper(0);
const wrapper2 = createTestWrapper(1);

describe("Category component", () => {
  test("should render correct elements", () => {
    const { container } = render(<Category />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should render game titles for 'games' category", () => {
    render(<Category />, { wrapper });
    const gamesTitle = screen.getAllByRole("heading", { name: /game$/i });

    gamesTitle.forEach((title) => {
      expect(title).toBeInTheDocument();
    });
  });

  test("should render game images for 'games' category", () => {
    render(<Category />, { wrapper });
    const gameImages = screen.getAllByRole("img", { name: /game game poster$/i });

    gameImages.forEach((img) => {
      expect(img).toBeInTheDocument();
    });
  });

  test("should filter fetch games array based on params", () => {
    render(<Category />, { wrapper: wrapper2 });
    const gamesTitle = screen.getAllByRole("heading", { name: /action$/i });

    gamesTitle.forEach((title) => {
      expect(title).toBeInTheDocument();
    });
  });
});
