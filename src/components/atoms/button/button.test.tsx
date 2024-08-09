import { render, screen } from "@testing-library/react";
import {
 describe, expect, it, vi,
} from "vitest";

import { Button } from "./button";

describe("Button", () => {
  const mockFunction = vi.fn();
  render(<Button onClick={mockFunction} />);

  it("should render button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    screen.getByRole("button").click();
    expect(mockFunction).toHaveBeenCalledTimes(1);
  });
});
