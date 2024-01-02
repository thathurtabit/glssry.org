import { describe, expect, it } from "vitest";

import { getNamesWithoutSpecialCharacters } from "./get-names-without-special-characters";

const filterForNames = (searchedName: string, array: string[]) => array.filter((name) => name === searchedName);

describe("getNamesWithoutSpecialCharacters", () => {
  it("should return an object with two arrays of strings", () => {
    const { MALE, FEMALE } = getNamesWithoutSpecialCharacters();

    expect(filterForNames("Æ A-Ⅻ", MALE).length).toBe(0);
    expect(filterForNames("Æ A-Ⅻ", FEMALE).length).toBe(0);
    expect(filterForNames("Smysław", MALE).length).toBe(0);
    expect(filterForNames("Smysław", FEMALE).length).toBe(0);

    expect(MALE).toContain("Roger");
    expect(FEMALE).toContain("Betty");
  });
});
