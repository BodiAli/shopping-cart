import Cart from "../../utils/cart";

describe("Cart Class", () => {
  test("cart should include an array of products", () => {
    const cart = new Cart();
    expect(Array.isArray(cart.products)).toBeTruthy();
  });

  test("addProduct should push products to the array", () => {
    const cart = new Cart();
    const product = { title: "shirt", price: 300 };
    cart.addProduct(product);
    expect(cart.products.includes(product)).toBeTruthy();
    expect(cart.products.length).toBe(1);
  });

  test("removeProduct should remove products in the array", () => {
    const cart = new Cart();
    const product1 = { title: "shirt", price: 300 };
    const product2 = { title: "pants", price: 200 };
    cart.addProduct(product1);
    cart.addProduct(product2);

    expect(cart.products.length).toBe(2);

    cart.removeProduct(product2);
    expect(cart.products.length).toBe(1);
    expect(cart.products.includes(product2)).toBeFalsy();
  });

  test("cart should have a count property to count number of products in the products array", () => {
    const cart = new Cart();
    const product1 = { title: "shirt" };
    const product2 = { title: "pants" };
    const product3 = { title: "hoodie" };
    cart.addProduct(product1);
    cart.addProduct(product2);
    cart.addProduct(product3);
    expect(cart.count).toBe(3);
  });

  test("isTheProductPresent should check if a product is in the products array", () => {
    const cart = new Cart();
    const product1 = { title: "shirt" };
    const product2 = { title: "pants" };

    cart.addProduct(product1);

    expect(cart.isTheProductPresent(product1)).toBeTruthy();
    expect(cart.isTheProductPresent(product2)).toBeFalsy();
  });

  test("getAllPrices should get the prices of all products", () => {
    const cart = new Cart();
    const product1 = { title: "shirt", price: "20.90" };
    const product2 = { title: "pants", price: "15.22" };
    const product3 = { title: "hoodie", price: "332.23" };
    cart.addProduct(product1);
    cart.addProduct(product2);
    cart.addProduct(product3);

    expect(cart.getAllPrices()).toBe("368.35");
  });
});
