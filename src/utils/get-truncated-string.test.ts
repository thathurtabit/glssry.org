import { describe, it, expect } from "vitest";

import { getTruncatedString } from "./get-truncated-string";

describe("getTruncatedString", () => {
  it("should return the same string if it is shorter than the length", () => {
    const string_ = "Hello world";
    expect(getTruncatedString(string_)).toEqual(string_);
  });
  it("should return the truncated string if it is longer than the length", () => {
    const string_ = "Hello world";
    expect(getTruncatedString(string_, 5)).toEqual("Hello...");
  });
});
