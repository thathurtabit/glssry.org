import { describe, expect, it } from "vitest";
import { getPascalCaseWithUnderscores } from "./get-pascal-case-with-underscores";

describe("getPascalCaseWithUnderscores", () => {
  it("should replace spaces with underscores", () => {
    expect(getPascalCaseWithUnderscores("Graphic Novels")).toBe("Graphic_Novels");
  });
});
