import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

it("The text Welcome to LOBSTR will display on the home page", () => {
  render(<Home />);

  expect(screen.getByText("Welcome to LOBSTR")).toBeInTheDocument();
});
