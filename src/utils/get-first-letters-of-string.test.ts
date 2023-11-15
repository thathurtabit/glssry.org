import { describe, expect, it } from "vitest";
import { getFirstLettersOfString } from "./get-first-letters-of-string";
describe("getFirstLettersOfString", () => {
  it("should return the first letters of a string", () => {
    expect(getFirstLettersOfString("hello world")).toBe("HW");
    expect(getFirstLettersOfString("Spam bot")).toBe("SB");
    expect(getFirstLettersOfString("Jim")).toBe("J");
    expect(getFirstLettersOfString("")).toBe("");
    expect(getFirstLettersOfString("Bill-me")).toBe("B");
  });
});
