import { describe, expect, it } from "vitest";
import { getRandomNumberDecimal } from "./get-random-number-decimal";
describe("getRandomNumberDecimal", () => {
  it("should return a random number between two numbers", () => {
    const max = 5;
    const min = -2.5;
    const randomNumber = getRandomNumberDecimal(max, min);
    expect(randomNumber).toBeGreaterThanOrEqual(min);
    expect(randomNumber).toBeLessThanOrEqual(max);
  });
});
