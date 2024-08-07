import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { vi } from "vitest";
import Category from "../../components/Category/Category";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";
import Cart from "../../utils/cart";
import userEvent from "@testing-library/user-event";

const cart = new Cart();

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
      return { data: MOCK_GAMES };
    case "action":
      return { data: MOCK_ACTION };
    default:
      throw new Error("Data not found");
  }
});

const handleButtonClick = vi.fn((product) => {
  if (cart.isTheProductPresent(product)) {
    cart.removeProduct(product);
  } else {
    cart.addProduct(product);
  }
});

// Mocking useOutletContext to return an array because it returns null and causes an error
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: vi.fn(() => {
      return { arr: [cart], handleButtonClick };
    }),
  };
});

vi.mock("../../utils/generatePrice", () => {
  return {
    default: vi.fn(() => "50.00"),
  };
});

const routes = [
  {
    path: "/:category",
    element: <Category />,
    errorElement: <ErrorComponent />,
    loader: Category.loader,
  },
];

function createTestWrapper(initialIndex) {
  const router = createMemoryRouter(routes, {
    initialEntries: ["/games", "/action", "/shirts"],
    initialIndex,
  });

  return function wrapper() {
    return <RouterProvider router={router} />;
  };
}
const wrapper = createTestWrapper(0);
const wrapper2 = createTestWrapper(1);
const wrapper3 = createTestWrapper(2);

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

  test("each game should have a price", () => {
    render(<Category />, { wrapper });
    const prices = screen.getAllByText(/50.00/);

    prices.forEach((price) => {
      expect(price).toBeInTheDocument();
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

  test("should display an error message when category is not found", () => {
    render(<Category />, { wrapper: wrapper3 });
    expect(screen.getByText(/data not found/i)).toBeInTheDocument();
  });

  test("should render button to mutate cart", () => {
    render(<Category />, { wrapper });
    const addToCartButtons = screen.getAllByRole("button", { name: /add to cart/i });

    addToCartButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test("should remove from cart after button click", async () => {
    const user = userEvent.setup();
    render(<Category />, { wrapper });

    const fifa = MOCK_GAMES.games[0];
    const addToCartButton = screen.getAllByRole("button", { name: /add to cart/i })[0];

    expect(cart.isTheProductPresent(fifa)).toBeFalsy();

    await user.click(addToCartButton);

    expect(cart.isTheProductPresent(fifa)).toBeTruthy();
  });

  test("should render button text to 'Remove from Cart' if the product is present", async () => {
    const fifa = MOCK_GAMES.games[0];
    cart.addProduct(fifa);

    render(<Category />, { wrapper });

    const button = screen.getByRole("button", { name: /remove from cart/i });

    expect(button).toBeInTheDocument();
  });
});
