import { describe, expect, it } from "vitest";

import { getRandomNumber } from "./get-random-number";

describe("getRandomNumber", () => {
  it("should return a number within range", () => {
    const min = 5;
    const max = 10;
    const result = getRandomNumber(max, min);
    expect(typeof result).toBe("number");
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
