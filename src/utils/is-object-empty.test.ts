import { describe, expect, it } from "vitest";
import { isObjectEmpty } from "./is-object-empty";

describe("isObjectEmpty", () => {
  it("should return true if object is empty", () => {
    expect(isObjectEmpty({})).toBeTruthy();
  });
  it("should return false if object is not empty", () => {
    expect(isObjectEmpty({ a: 1 })).toBeFalsy();
  });
});
