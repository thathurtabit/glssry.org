import { TagName } from "@prisma/client";
import { describe, expect, it } from "vitest";

import { getPascalCaseFromKebabCase } from "./get-pascal-case-from-kebab-case";

describe("getPascalCaseFromKebabCase", () => {
  it("should convert kebab-case to PascalCase", () => {
    expect(getPascalCaseFromKebabCase("animals")).toEqual(TagName.Animals);
  });
  it("should convert kebab-case to PascalCase (with hyphens)", () => {
    expect(getPascalCaseFromKebabCase("something-else-yeah")).toEqual("SomethingElseYeah");
  });

  it("should convert kebab-case to PascalCase (swap hyphens for spaces)", () => {
    expect(getPascalCaseFromKebabCase("something-else-yeah", " ")).toEqual("Something Else Yeah");
  });

  it("should convert kebab-case to PascalCase (swap underscore for spaces)", () => {
    expect(getPascalCaseFromKebabCase("Graphic_novel-Hello", " ")).toEqual("Graphic Novel Hello");
  });
});
