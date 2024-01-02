import { describe, expect, it } from "vitest";

import { cutArrayIntoChunks } from "./cut-array-into-chunks";

describe("cutArrayIntoChunks", () => {
  it("should take a generic array and return only the initial array as sub array if 1 element in array is passed", () => {
    expect(cutArrayIntoChunks<string>(["text"], 1)).toEqual([["text"]]);
  });

  it("should take a generic array and return an array of arrays of desired chunk length", () => {
    const data = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const expected = [["a", "b", "c", "d", "e"],
    ["f", "g", "h", "i", "j"],
    ["k", "l", "m", "n", "o"],
    ["p", "q", "r", "s", "t"],
    ["u", "v", "w", "x", "y"],
    ["z"]];
    expect(cutArrayIntoChunks<string>(data, 5)).toEqual(expected);
  });
});

