import { describe, expect, it } from "vitest";

import { getShuffledArray } from "./get-shuffled-array";
describe("getShuffledArray", () => {
  it("should return a shuffled array", () => {
    const unshuffledArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(getShuffledArray(unshuffledArray)).not.toEqual(unshuffledArray);
  });

  it("should not repeat any items", () => {
    const unshuffledArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const shuffledArray = getShuffledArray(unshuffledArray);
    const shuffledSet = new Set(shuffledArray);
    expect(shuffledSet.size).toEqual(shuffledArray.length);
  });

  it("should return the same array if length is 1", () => {
    const unshuffledArray = [1];
    expect(getShuffledArray(unshuffledArray)).toEqual(unshuffledArray);
  });
});
