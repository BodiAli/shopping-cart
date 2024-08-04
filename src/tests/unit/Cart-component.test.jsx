import { render, screen } from "@testing-library/react";
import Cart from "../../utils/cart";
import CartComponent from "../../components/CartComponent/CartComponent";

const cart = new Cart([
  {
    title: "Fifa game",
    price: "50.50",
  },
  {
    title: "COD game",
    price: "50.50",
  },
  {
    title: "Minecraft game",
    price: "50.50",
  },
]);

describe("Cart Component", () => {
  test("should render correct elements", () => {
    const { container } = render(<CartComponent cart={cart} />);
    expect(container).toMatchSnapshot();
  });

  test("should render games in products array", () => {
    render(<CartComponent cart={cart} />);
    const games = screen.getAllByRole("heading", { name: /game$/i });
    games.forEach((game) => {
      expect(game).toBeInTheDocument();
    });
  });

  test("should render a remove button", () => {
    render(<CartComponent cart={cart} />);
    const removeButton = screen.getByRole("button", { name: /remove/i });
    expect(removeButton).toBeInTheDocument();
  });

  test("should have a checkout button", () => {
    render(<CartComponent cart={cart} />);
    const checkoutButton = screen.getByRole("button", { name: /checkout/i });
    expect(checkoutButton).toBeInTheDocument();
  });
});
