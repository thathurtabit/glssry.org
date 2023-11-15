import { describe, expect, it } from "vitest";
import { getFormattedDate } from "./get-formatted-date";

describe("getFormattedDate", () => {
  it("should return \"n/a\" if date is undefined", () => {
    expect(getFormattedDate({ date: undefined })).toBe("n/a");
  });
  it("should return \"n/a\" if date is null", () => {
    expect(getFormattedDate({ date: null })).toBe("n/a");
  });
  it("should return formatted date (without year offset)", () => {
    expect(getFormattedDate({ date: new Date(2021, 0, 1) })).toBe("1st Jan, 2021");
  });
});
