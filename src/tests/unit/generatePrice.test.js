import generatePrice from "../../utils/generatePrice";
describe("generatePrice function", () => {
  test("should generate a 50.50 number", () => {
    const price = generatePrice();
    expect(price).toBe("50.50");
  });

  test("should return a price with two decimal places", () => {
    const price = generatePrice();
    expect(price).toMatch(/^\d+\.\d{2}$/);
  });
});
