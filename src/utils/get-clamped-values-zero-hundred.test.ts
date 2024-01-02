import { describe, expect, it } from "vitest";

import { getClampedValueZeroToHundred } from "./get-clamped-values-zero-hundred";
describe("getClampedValueZeroToHundred", () => {
  it("should return 0 if value is less than 0", () => {
    expect(getClampedValueZeroToHundred(-1)).toBe(0);
  });
  it("should return 100 if value is greater than 100", () => {
    expect(getClampedValueZeroToHundred(101)).toBe(100);
  });
  it("should return the value if it is between 0 and 100", () => {
    expect(getClampedValueZeroToHundred(50)).toBe(50);
  });
});
