import { describe, it, expect } from "vitest";
import { getTruncatedString } from "./get-truncated-string";

describe("getTruncatedString", () => {
  it("should return the same string if it is shorter than the length", () => {
    const str = "Hello world";
    expect(getTruncatedString(str)).toEqual(str);
  });
  it("should return the truncated string if it is longer than the length", () => {
    const str = "Hello world";
    expect(getTruncatedString(str, 5)).toEqual("Hello...");
  });
});
