import { describe, expect, it } from "vitest";

import { getPercentage } from "./get-percentage";
describe("getPercentage", () => {
  it("should return 0 when the numerator is 0", () => {
    expect(getPercentage(0, 100)).toBe(0);
  });
  it("should return 10 when the numerator is 10/100", () => {
    expect(getPercentage(10, 100)).toBe(10);
  });
  it("should return 50 when the numerator is 2/14", () => {
    expect(getPercentage(2, 4)).toBe(50);
  });
  it("should return 33 when the numerator is 1/3", () => {
    expect(getPercentage(1, 3)).toBe(33);
  });
});
