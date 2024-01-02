import { describe, expect, it } from "vitest";

import { removeNonNumericCharacters } from "./remove-non-numeric-characters";

describe("removeNonNumericCharacters", () => {
  it("should return original numbers where there are no non-numeric characters", () => {
    const value = "1234567890";
    const result = removeNonNumericCharacters(value);

    expect(result).toEqual(value);
  });

  it("should remove non-numeric characters", () => {
    expect(removeNonNumericCharacters("++123")).toEqual("123");
    expect(removeNonNumericCharacters("--123")).toEqual("123");
    expect(removeNonNumericCharacters("abc1")).toEqual("1");
  });
});
