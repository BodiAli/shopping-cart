import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { vi } from "vitest";
import ShopPage from "../../pages/ShopPage/ShopPage";
import Cart from "../../utils/cart";

const cart = new Cart([{ title: "Call of Duty" }]);

// Mocking useOutletContext to return an array because it returns null and causes an error
vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useOutletContext: vi.fn(() => {
      return { arr: [cart] };
    }),
  };
});

// Test if it renders the CartComponent with cart object
vi.mock("../../components/CartComponent/CartComponent", () => {
  return {
    default: vi.fn(({ cart }) => <p>{cart.products[0].title}</p>),
  };
});

const router = createMemoryRouter([
  {
    path: "/",
    element: <ShopPage />,
  },
]);

const wrapper = () => <RouterProvider router={router} />;

describe("Shop page", () => {
  test("should render correct elements", () => {
    const { container } = render(<ShopPage />, { wrapper });
    expect(container).toMatchSnapshot();
  });

  test("should render games nav", () => {
    render(<ShopPage />, { wrapper });
    expect(screen.getByRole("heading", { name: /games/i })).toBeInTheDocument();

    const gamesNav = screen.getByRole("link", { name: /games/i });

    expect(gamesNav).toBeInTheDocument();
    expect(gamesNav).toHaveAttribute("href", "/games");
  });

  test("should render platforms navigation", () => {
    render(<ShopPage />, { wrapper });
    expect(screen.getByRole("heading", { name: /platforms/i })).toBeInTheDocument();

    const windowsNav = screen.getByRole("link", { name: /windows/i });
    const macNav = screen.getByRole("link", { name: /mac/i });
    const linuxNav = screen.getByRole("link", { name: /linux/i });
    const androidNav = screen.getByRole("link", { name: /android/i });
    const iPhoneNav = screen.getByRole("link", { name: /iphone/i });

    expect(windowsNav).toBeInTheDocument();
    expect(macNav).toBeInTheDocument();
    expect(linuxNav).toBeInTheDocument();
    expect(androidNav).toBeInTheDocument();
    expect(iPhoneNav).toBeInTheDocument();

    expect(windowsNav).toHaveAttribute("href", "/windows");
    expect(macNav).toHaveAttribute("href", "/mac");
    expect(linuxNav).toHaveAttribute("href", "/linux");
    expect(androidNav).toHaveAttribute("href", "/android");
    expect(iPhoneNav).toHaveAttribute("href", "/iphone");
  });

  test("should render genres navigation", () => {
    render(<ShopPage />, { wrapper });
    expect(screen.getByRole("heading", { name: /genres/i })).toBeInTheDocument();

    const actionNav = screen.getByRole("link", { name: /action/i });
    const adventureNav = screen.getByRole("link", { name: /adventure/i });
    const educationNav = screen.getByRole("link", { name: /education/i });
    const arcadeNav = screen.getByRole("link", { name: /arcade/i });
    const racingNav = screen.getByRole("link", { name: /racing/i });
    const simulationNav = screen.getByRole("link", { name: /simulation/i });
    const puzzleNav = screen.getByRole("link", { name: /puzzle/i });
    const strategyNav = screen.getByRole("link", { name: /strategy/i });

    expect(actionNav).toBeInTheDocument();
    expect(adventureNav).toBeInTheDocument();
    expect(educationNav).toBeInTheDocument();
    expect(arcadeNav).toBeInTheDocument();
    expect(racingNav).toBeInTheDocument();
    expect(simulationNav).toBeInTheDocument();
    expect(puzzleNav).toBeInTheDocument();
    expect(strategyNav).toBeInTheDocument();

    expect(actionNav).toHaveAttribute("href", "/action");
    expect(adventureNav).toHaveAttribute("href", "/adventure");
    expect(educationNav).toHaveAttribute("href", "/education");
    expect(arcadeNav).toHaveAttribute("href", "/arcade");
    expect(racingNav).toHaveAttribute("href", "/racing");
    expect(simulationNav).toHaveAttribute("href", "/simulation");
    expect(puzzleNav).toHaveAttribute("href", "/puzzle");
    expect(strategyNav).toHaveAttribute("href", "/strategy");
  });

  test("should render an element to view cart", () => {
    render(<ShopPage />, { wrapper });
    expect(screen.getByRole("heading", { name: /view cart/i })).toBeInTheDocument();
  });

  test("should render number of cart items in the cart", async () => {
    const { unmount } = render(<ShopPage />, { wrapper });
    expect(screen.getByTestId("quantity")).toHaveTextContent(1);

    unmount();
    cart.addProduct({ title: "Fifa" });
    cart.addProduct({ title: "Minecraft" });

    render(<ShopPage />, { wrapper });
    expect(screen.getByTestId("quantity")).toHaveTextContent(3);
  });
});
