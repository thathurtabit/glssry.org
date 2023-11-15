import { describe, expect, it } from "vitest";
import { getTotalDaysInMonth } from "./get-total-days-in-month";
describe("getTotalDaysInMonth", () => {
  it("should return correct number of days in month (jan, 23)", () => {
    const result = getTotalDaysInMonth(1, 2023);
    expect(result).toBe(31);
  });
  it("should return correct number of days in month (feb, 20)", () => {
    const result = getTotalDaysInMonth(2, 2020);
    expect(result).toBe(29);
  });
  it("should return correct number of days in month (sep, 19)", () => {
    const result = getTotalDaysInMonth(9, 2019);
    expect(result).toBe(30);
  });
});
