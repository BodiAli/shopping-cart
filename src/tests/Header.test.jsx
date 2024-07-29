import { render, screen } from "@testing-library/react";
import Header from "../components/Header/Header";
import { expect } from "vitest";

describe("Header component", () => {
  test("should render correct elements", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });

  test("should render header element", () => {
    render(<Header />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
  });

  test("should render home button", () => {
    render(<Header />);
    expect(screen.getByRole("button", { name: "Home" })).toBeInTheDocument();
  });
});
