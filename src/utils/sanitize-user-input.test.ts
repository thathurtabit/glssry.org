import { describe, expect, it } from "vitest";
import { sanitizeUserInput } from "./sanitize-user-input";
describe("sanitizeUserInput", () => {
  it("should remove all non-alphanumeric characters", () => {
    const input = "This is a test string? With, some... non-alphanumeric characters?!@#$%^&*()_+<button>test</button>";
    const expected = "This is a test string? With, some... non-alphanumeric characters?!*buttontestbutton";
    expect(sanitizeUserInput(input)).toEqual(expected);
  });
});
