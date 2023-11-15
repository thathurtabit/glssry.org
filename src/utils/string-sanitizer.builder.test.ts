import { describe, expect, it } from "vitest";
import { StringSanitizerBuilder } from "./string-sanitizer.builder";

describe("StringSanitizerBuilder", () => {
  it("should return the original string if no mutation methods called", () => {
    const input = "test";
    const expected = input;
    const result = new StringSanitizerBuilder(input).build();
    expect(result).toEqual(expected);
  });
  it("should remove a single swear if present", () => {
    const input = "fuck you";
    const expected = "**** you";
    const result = new StringSanitizerBuilder(input).removeSwears().build();
    expect(result).toEqual(expected);
  });
  it("should remove a multiple swears if present", () => {
    const input = "fuck you prick";
    const expected = "**** you *****";
    const result = new StringSanitizerBuilder(input).removeSwears().build();
    expect(result).toEqual(expected);
  });
  it("should replace a multiple swears if present", () => {
    const input = "fuck you prick";
    const expected = "hello you hello";
    const result = new StringSanitizerBuilder(input).replaceSwearsWith("hello").build();
    expect(result).toEqual(expected);
  });
  it("should capitalize first letter of each word", () => {
    const input = "hello fren";
    const expected = "Hello Fren";
    const result = new StringSanitizerBuilder(input)
      .capitalizeFirstLetters()
      .build();
    expect(result).toEqual(expected);
  });
  it("should capitalize first letter of each word (with swears)", () => {
    const input = "fuck you prick man";
    const expected = "**** You ***** Man";
    const result = new StringSanitizerBuilder(input)
      .removeSwears()
      .capitalizeFirstLetters()
      .build();
    expect(result).toEqual(expected);
  });
  it("should capitalize first letter of each word and replace spaces with hyphens", () => {
    const input = "fuck you prick man";
    const expected = "****-You-*****-Man";
    const result = new StringSanitizerBuilder(input)
      .removeSwears()
      .capitalizeFirstLetters()
      .replaceWith(" ", "-")
      .build();
    expect(result).toEqual(expected);
  });

  it("should remove dodgy characters", () => {
    const input = "fuck you prick man&&&[]+";
    const expected = "****-You-*****-Man";
    const result = new StringSanitizerBuilder(input)
      .removeSwears()
      .capitalizeFirstLetters()
      .replaceWith(" ", "-")
      .removeDodgyCharacters()
      .build();
    expect(result).toEqual(expected);
  });

  it("should make lowercase", () => {
    const input = "fuck you prick man&&&[]+";
    const expected = "****-you-*****-man";
    const result = new StringSanitizerBuilder(input)
      .removeSwears()
      .capitalizeFirstLetters()
      .replaceWith(" ", "-")
      .removeDodgyCharacters()
      .toLowerCase()
      .build();
    expect(result).toEqual(expected);
  });

  it("should return alphanumeric only", () => {
    const input = "fuckyou prickman&&&[]+";
    const expected = "****you-*****man";
    const result = new StringSanitizerBuilder(input)
      .removeSwears()
      .replaceWith(" ", "-")
      .nonSuspiciousCharactersOnly()
      .toLowerCase()
      .build();
    expect(result).toEqual(expected);
  });

  it("should remove sequential hyphens and spaces", () => {
    const input = "stephen-----f";
    const expected = "stephen-f";
    const result = new StringSanitizerBuilder(input)
      .removeSequentialSpacesAndHyphens()
      .build();
    expect(result).toEqual(expected);
  });

  it("should return alpha and hyphens only", () => {
    const input = "fuckyou prickman&&&[]+";
    const expected = "you man";
    const result = new StringSanitizerBuilder(input)
      .removeSwears()
      .alphaAndHyphensSpacesOnly()
      .build();
    expect(result).toEqual(expected);
  });

  it("should return alpha and hyphens and asterisks only", () => {
    const input = "fuckyou prickman&&&[]+";
    const expected = "****you *****man";
    const result = new StringSanitizerBuilder(input)
      .removeSwears()
      .alphaAndHyphensAsteriskSpacesOnly()
      .build();
    expect(result).toEqual(expected);
  });
});
