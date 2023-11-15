import { describe, expect, it } from "vitest";
import { getYYYMMDDFromDate } from "./get-yyyy-mm-dd-from-date";

describe("getYYYMMDDFromDate", () => {
  it("should return the date in YYYY-MM-DD format", () => {
    const date = new Date("2000-1-1");
    const yyyymmdd = getYYYMMDDFromDate(date);
    expect(yyyymmdd).toBe("2000-01-01");
  });
});
