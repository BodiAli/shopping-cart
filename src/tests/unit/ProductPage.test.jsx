import { render, screen } from "@testing-library/react";
import ProductPage from "../../pages/ProductPage/ProductPage";
import { vi } from "vitest";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Cart from "../../utils/cart";

const cart = new Cart();

const handleButtonClick = vi.fn();
const games = JSON.stringify({
  games: [
    {
      alternate_titles: [
        {
          title: "block game",
          description: "another title",
        },
      ],

      title: "Minecraft game",
      sample_cover: {
        thumbnail_image: "image.jpg",
      },
      description: "<p>A game where you build stuff</p>",
      genres: [
        {
          genre_category: "Basic genres",
          genre_name: "Adventure",
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
  ],
});
const MOCK_GAME = {
  contents: games,
};

// eslint-disable-next-line no-undef
global.fetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    json: vi.fn(() => Promise.resolve(MOCK_GAME)),
  })
);

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

const router = createMemoryRouter([
  {
    path: "/",
    element: <ProductPage />,
    loader: ProductPage.loader,
  },
]);

const wrapper = () => <RouterProvider router={router} />;

describe("Product page component", () => {
  test("should render correct elements", () => {
    const { container } = render(<ProductPage />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should change document title", () => {
    render(<ProductPage />, { wrapper });
    expect(document.title).toBe("Minecraft game | GameVault");
  });

  test("should render a back button", () => {
    render(<ProductPage />, { wrapper });
    expect(screen.getByRole("button", { name: /back/i })).toBeInTheDocument();
  });

  test("should render game screenshots", () => {
    render(<ProductPage />, { wrapper });
    const carousel = screen.getByTestId("carousel");
    const images = screen.getAllByAltText("game screenshot");
    images.forEach((image) => {
      expect(carousel).toContainElement(image);
    });
    expect(screen.getByText(/game screenshots/i)).toBeInTheDocument();
  });

  test("should render game cover image", () => {
    render(<ProductPage />, { wrapper });
    const image = screen.getByAltText(/minecraft game game poster/i);
    expect(image.src).toContain("image.jpg");
  });

  test("should render game title", () => {
    render(<ProductPage />, { wrapper });
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Minecraft game");
  });

  test("should render game alternate titles", () => {
    render(<ProductPage />, { wrapper });
    expect(screen.getByText(/alternate titles:/i)).toBeInTheDocument();
    expect(screen.getByText(/block game/i)).toBeInTheDocument();
    expect(screen.getByText(/another title/i)).toBeInTheDocument();
  });

  test("should render game genres", () => {
    render(<ProductPage />, { wrapper });
    expect(screen.getByText(/genres:/i)).toBeInTheDocument();
    expect(screen.getByText(/basic genres/i)).toBeInTheDocument();
    expect(screen.getByText(/adventure/i)).toBeInTheDocument();
  });

  test("should render game platforms", () => {
    render(<ProductPage />, { wrapper });
    expect(screen.getByText(/platforms:/i)).toBeInTheDocument();
    expect(screen.getByText(/windows/i)).toBeInTheDocument();
    expect(screen.getByText(/2012/i)).toBeInTheDocument();
  });

  test("should render game description", () => {
    render(<ProductPage />, { wrapper });
    expect(screen.getByText(/a game where you build stuff/i)).toBeInTheDocument();
  });

  test("should render game price", () => {
    render(<ProductPage />, { wrapper });
    expect(screen.getByText(/price:/i)).toBeInTheDocument();
    expect(screen.getByText(/50.50/i)).toBeInTheDocument();
  });
});
