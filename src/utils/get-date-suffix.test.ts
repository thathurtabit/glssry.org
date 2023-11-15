import { describe, expect, it } from "vitest";
import { getDateSuffix } from "./get-date-suffix";
describe("getDateSuffix", () => {
  it("should return \"1st\" if date is 1", () => {
    expect(getDateSuffix(1)).toBe("1st");
  });
  it("should return \"2nd\" if date is 2", () => {
    expect(getDateSuffix(2)).toBe("2nd");
  });
  it("should return \"3rd\" if date is 3", () => {
    expect(getDateSuffix(3)).toBe("3rd");
  });
  it("should return \"4th\" if date is 4", () => {
    expect(getDateSuffix(4)).toBe("4th");
  });
  it("should return \"8th\" if date is 8", () => {
    expect(getDateSuffix(8)).toBe("8th");
  });
  it("should return \"10th\" if date is 10", () => {
    expect(getDateSuffix(10)).toBe("10th");
  });
  it("should return \"11th\" if date is 11", () => {
    expect(getDateSuffix(11)).toBe("11th");
  });
  it("should return \"21st\" if date is 21", () => {
    expect(getDateSuffix(21)).toBe("21st");
  });
  it("should return \"22nd\" if date is 22", () => {
    expect(getDateSuffix(22)).toBe("22nd");
  });
  it("should return \"23rd\" if date is 23", () => {
    expect(getDateSuffix(23)).toBe("23rd");
  });
  it("should return \"25th\" if date is 25", () => {
    expect(getDateSuffix(25)).toBe("25th");
  });
  it("should return \"31st\" if date is 31", () => {
    expect(getDateSuffix(31)).toBe("31st");
  });
});
