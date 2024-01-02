import { describe, expect, it } from "vitest";

import { getDateXYearsAgo } from "./get-date-x-years-ago";

describe("getDateXYearsAgo", () => {
  it("should return a date", () => {
    const date = getDateXYearsAgo(1);
    expect(date).toBeInstanceOf(Date);
  });

  it("should return correct year", () => {
    const dateToTest = getDateXYearsAgo(10);
    expect(dateToTest.getFullYear()).toBe(new Date().getFullYear() - 10);
  });

  it("should return correct month", () => {
    const dateToTest = getDateXYearsAgo(1);
    expect(dateToTest.getMonth() - 1).toBe(new Date().getMonth() - 1);
  });

  it("should return correct date", () => {
    const dateToTest = getDateXYearsAgo(10);
    expect(dateToTest.getDate()).toBe(new Date().getDate());
  });
});
