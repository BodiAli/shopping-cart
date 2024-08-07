import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";
import Cart from "../../utils/cart";
import CartComponent from "../../components/CartComponent/CartComponent";
import { vi } from "vitest";

const cart = new Cart([
  {
    title: "Fifa game",
    price: "50.50",
    quantity: 1,
  },
  {
    title: "COD game",
    price: "50.50",
    quantity: 1,
  },
  {
    title: "Minecraft game",
    price: "50.50",
    quantity: 1,
  },
]);

const handleInputChange = vi.fn();

const handleProductRemove = vi.fn();

describe("Cart Component", () => {
  test("should render correct elements", () => {
    const { container } = render(
      <CartComponent
        cart={cart}
        handleInputChange={handleInputChange}
        handleProductRemove={handleProductRemove}
      />
    );
    expect(container).toMatchSnapshot();
  });

  test("should render games in products array", () => {
    render(
      <CartComponent
        cart={cart}
        handleInputChange={handleInputChange}
        handleProductRemove={handleProductRemove}
      />
    );
    const games = screen.getAllByRole("heading", { name: /game$/i });
    games.forEach((game) => {
      expect(game).toBeInTheDocument();
    });
  });

  test("should render a remove button for each product", () => {
    render(
      <CartComponent
        cart={cart}
        handleInputChange={handleInputChange}
        handleProductRemove={handleProductRemove}
      />
    );
    const removeButtons = screen.getAllByRole("button", { name: /remove/i });

    removeButtons.forEach((button) => {
      expect(button).toBeInTheDocument();
    });
  });

  test("should call the handleProductRemove function when clicked", async () => {
    const user = userEvent.setup();
    render(
      <CartComponent
        cart={cart}
        handleInputChange={handleInputChange}
        handleProductRemove={handleProductRemove}
      />
    );
    const removeButton = screen.getAllByRole("button", { name: /remove/i })[0];

    await user.click(removeButton);

    expect(handleProductRemove).toHaveBeenCalledOnce();
  });

  test("should call the handleInputChange function when typing", async () => {
    const user = userEvent.setup();
    render(
      <CartComponent
        cart={cart}
        handleInputChange={handleInputChange}
        handleProductRemove={handleProductRemove}
      />
    );
    const input = screen.getAllByDisplayValue("1")[0];

    await user.type(input, "22");

    expect(handleInputChange).toHaveBeenCalled();
  });

  test("should have a checkout button", () => {
    render(
      <CartComponent
        cart={cart}
        handleInputChange={handleInputChange}
        handleProductRemove={handleProductRemove}
      />
    );
    const checkoutButton = screen.getByRole("button", { name: /checkout/i });
    expect(checkoutButton).toBeInTheDocument();
  });

  test("should have the total price of all products", () => {
    render(
      <CartComponent
        cart={cart}
        handleInputChange={handleInputChange}
        handleProductRemove={handleProductRemove}
      />
    );
    const totalPrice = screen.getByText(/total: 151.50/i);
    expect(totalPrice).toBeInTheDocument();
  });
});
