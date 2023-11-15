import { describe, expect, it } from "vitest";
import { addLeadingZerosToYear } from "./add-leading-zeros-to-year";

describe("addLeadingZerosToYear", () => {
  it("should return original number as string if already at correct length", () => {
    expect(addLeadingZerosToYear(2019)).toBe("2019");
  });

  it("should add leading zeros up until correct length is met", () => {
    expect(addLeadingZerosToYear(1)).toBe("0001");
  });
});
