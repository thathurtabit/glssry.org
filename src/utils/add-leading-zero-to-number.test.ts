import { describe, expect, it } from "vitest";
import { addLeadingZeroToNumber } from "./add-leading-zero-to-number";
describe("addLeadingZeroToNumber", () => {
  it("should add a leading zero to a number less than 10", () => {
    expect(addLeadingZeroToNumber(1)).toEqual("01");
  });
  it("should not add a leading zero to a number greater than 10", () => {
    expect(addLeadingZeroToNumber(11)).toEqual("11");
  });
});
