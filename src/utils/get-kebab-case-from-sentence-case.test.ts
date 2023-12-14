import { describe, it, expect } from "vitest";
import { getKebabCaseFromSentenceCase } from "./get-kebab-case-from-sentence-case";

describe("getKebabCaseFromSentenceCase", () => {
  it("should return a kebab case string from a sentence case string", () => {
    expect(getKebabCaseFromSentenceCase("Cascading Style Sheets")).toBe("cascading-style-sheets");
  });
});
