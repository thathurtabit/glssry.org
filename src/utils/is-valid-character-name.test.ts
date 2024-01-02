import { describe, expect, it } from "vitest";

import { isValidCharacterName } from "./is-valid-character-name";

describe("characterNameValidation", () => {
  it("should return true if the name is valid", () => {
    expect(isValidCharacterName("JohnDoe")).toBe(true);
    expect(isValidCharacterName("John")).toBe(true);
  });

  it("should return false if the name is invalid", () => {
    expect(isValidCharacterName("John9")).toBe(false);
    expect(isValidCharacterName("John_")).toBe(false);
    expect(isValidCharacterName("John.")).toBe(false);
  });
});
