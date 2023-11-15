import { describe, expect, it } from "vitest";
import { getDDMMYYDate } from "./get-dd-mm-yy-date";

describe("getDDMMYYDate", () => {
  it("should return formatted date (without year offset)", () => {
    expect(getDDMMYYDate({ date: new Date(2021, 0, 1) })).toStrictEqual({ dd: 1, mm: 1, yy: 21 });
  });
});
