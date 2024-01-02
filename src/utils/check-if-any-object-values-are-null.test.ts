import { describe, expect, it } from "vitest";

import { checkIfAnyObjectValuesAreNull } from "./check-if-any-object-values-are-null";
describe("checkIfAnyObjectValuesAreNull", () => {
  it("should return true if any values are null", () => {
    const object = {
      a: "hello",
      b: null,
    };
    const result = checkIfAnyObjectValuesAreNull(object);
    expect(result).toBe(true);
  });

  it("should return true if any values are undefined", () => {
    const object = {
      a: "hello",
      b: undefined,
    };
    const result = checkIfAnyObjectValuesAreNull(object);
    expect(result).toBe(true);
  });

  it("should return false if values are not null/undefined", () => {
    const object = {
      a: "hello",
      b: "hey",
      c: 0,
      d: [],
    };
    const result = checkIfAnyObjectValuesAreNull(object);
    expect(result).toBe(false);
  });
});
