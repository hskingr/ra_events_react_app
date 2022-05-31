import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders learn react link", () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test("search button click creates a list of results", () => {
  render(<App />);
  const buttonElement = screen.getByRole("button");
});

test("text will appear in search bar if typed inside", () => {});
