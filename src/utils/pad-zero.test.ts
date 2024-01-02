import { describe, expect, it } from "vitest";

import { padZero } from "./pad-zero";
describe("padZero", () => {
  it("should pad a single digit with two zeros", () => {
    expect(padZero(1)).toEqual("001");
  });

  it("should pad a single digit with three zeros", () => {
    expect(padZero(0)).toEqual("000");
  });

  it("should pad a double digit with one zeros", () => {
    expect(padZero(20)).toEqual("020");
  });

  it("should return the original number when there's three numbers", () => {
    expect(padZero(444)).toEqual("444");
  });
});
