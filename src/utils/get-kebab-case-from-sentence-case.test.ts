import { describe, it, expect } from "vitest";

import { getKebabCaseFromSentenceCase } from "./get-kebab-case-from-sentence-case";

describe("getKebabCaseFromSentenceCase", () => {
  it("should return a kebab case string from a sentence case string", () => {
    expect(getKebabCaseFromSentenceCase("Cascading Style Sheets")).toBe("cascading-style-sheets");
  });

  it("should allow only alpha and numbers", () => {
    expect(getKebabCaseFromSentenceCase("Maslow's hierarchy of needs 007!")).toBe("maslows-hierarchy-of-needs-007");
  });

  it("should allow hyphens", () => {
    expect(getKebabCaseFromSentenceCase("maslows-hierarchy of needs-007")).toBe("maslows-hierarchy-of-needs-007");
  });

  it("should swap out underscores for hyphens", () => {
    expect(getKebabCaseFromSentenceCase("Graphic_Novels")).toBe("graphic-novels");
    expect(getKebabCaseFromSentenceCase("Graphic Novels")).toBe("graphic-novels");
  });

  it("should remove apostrophes", () => {
    expect(getKebabCaseFromSentenceCase("User's Network")).toBe("users-network");
  });
});
