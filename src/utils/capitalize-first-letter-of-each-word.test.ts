import { describe, expect, it } from "vitest";

import { capitalizeFirstLetterOfEachWord } from "./capitalize-first-letter-of-each-word";
describe("capitalizeFirstLetterOfEachWord", () => {
  it("should capitalize the first letter of each word", () => {
    expect(capitalizeFirstLetterOfEachWord("Hello there")).toBe("Hello There");
    expect(capitalizeFirstLetterOfEachWord("Hello there son")).toBe("Hello There Son");
  });

  it("should capitalize the first letter of each word (custom split)", () => {
    expect(capitalizeFirstLetterOfEachWord("Hello-there", "-")).toBe("Hello-There");
  });

  it("should return the same value if already capitalized", () => {
    expect(capitalizeFirstLetterOfEachWord("Hello-There", "-")).toBe("Hello-There");
  });
});
