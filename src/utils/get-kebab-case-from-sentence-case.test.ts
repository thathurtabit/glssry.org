import { describe, it, expect } from "vitest";
import { getKebabCaseFromSentenceCase } from "./get-kebab-case-from-sentence-case";

describe("getKebabCaseFromSentenceCase", () => {
  it("should return a kebab case string from a sentence case string", () => {
    expect(getKebabCaseFromSentenceCase("Cascading Style Sheets")).toBe("cascading-style-sheets");
  });

  it("should allow only alpha and numbers", () => {
    expect(getKebabCaseFromSentenceCase("Maslow's hierarchy of needs 007!")).toBe("maslows-hierarchy-of-needs-007");
  });
});
