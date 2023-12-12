import { describe, expect, it } from "vitest";
import { removeItemFromArrayAtIndex } from "./remove-item-from-array-at-index";

describe("removeItemFromArrayAtIndex", () => {
  it("should remove the item at the given index", () => {
    const array = ["a", "b", "c"];
    const index = 1;
    const expected = ["a", "c"];

    const actual = removeItemFromArrayAtIndex(array, index);

    expect(actual).toEqual(expected);
  });
});
