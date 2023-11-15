import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "./button";

describe("Button", () => {
  const mockFn = vi.fn();
  render(<Button onClick={mockFn} />);

  it("should render button", () => {
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("should call onClick when clicked", () => {
    screen.getByRole("button").click();
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
