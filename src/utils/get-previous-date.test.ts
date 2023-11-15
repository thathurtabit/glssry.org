import { describe, expect, it } from "vitest";
import { getPreviousDate } from "./get-previous-date";

describe("getPreviousDate", () => {
  it("should return a date in the past (1 month ago)", () => {
    const date = new Date("2000-01-01");
    const result = getPreviousDate(date, 1);
    const resultYear = result.getFullYear();
    const resultMonth = result.getMonth() + 1;
    const resultDate = result.getDate();
    expect(resultYear).toEqual(1999);
    expect(resultMonth).toEqual(12);
    expect(resultDate).toEqual(1);
  });

  it("should return a date in the past (2 months ago)", () => {
    const date = new Date("2000-01-01");
    const result = getPreviousDate(date, 2);
    const resultYear = result.getFullYear();
    const resultMonth = result.getMonth() + 1;
    const resultDate = result.getDate();
    expect(resultYear).toEqual(1999);
    expect(resultMonth).toEqual(11);
    expect(resultDate).toEqual(1);
  });

  it("should return a date in the past (1 month ago)", () => {
    const date = new Date("2000-03-31");
    const result = getPreviousDate(date, 1);
    const resultYear = result.getFullYear();
    const resultMonth = result.getMonth() + 1;
    const resultDate = result.getDate();
    expect(resultYear).toEqual(2000);
    expect(resultMonth).toEqual(2);
    expect(resultDate).toEqual(29);
  });

  it("should return a date in the past (1 month ago)", () => {
    const date = new Date("1983-12-31");
    const result = getPreviousDate(date, 1);
    const resultYear = result.getFullYear();
    const resultMonth = result.getMonth() + 1;
    const resultDate = result.getDate();
    expect(resultYear).toEqual(1983);
    expect(resultMonth).toEqual(11);
    expect(resultDate).toEqual(30);
  });

  it("should return a date in the past (2 months ago)", () => {
    const date = new Date("2000-03-31");
    const result = getPreviousDate(date, 2);
    const resultYear = result.getFullYear();
    const resultMonth = result.getMonth() + 1;
    const resultDate = result.getDate();
    expect(resultYear).toEqual(2000);
    expect(resultMonth).toEqual(1);
    expect(resultDate).toEqual(31);
  });
});
