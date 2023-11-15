import { cleanUpSwearyString } from "swears";
import { capitalizeFirstLetterOfEachWord } from "./capitalize-first-letter-of-each-word";
import { replaceAll } from "./replace-all";

/**
 * @description uses the builder pattern to sanitize a string
 */
export class StringSanitizerBuilder {
  constructor(
    private _string: string
  ) {
    this._string = _string;
  }

  removeDodgyCharacters() {
    this._string = this._string.replaceAll(/[^\d !'*,.:;?A-Za-z—-]/g, "");
    return this;
  }

  nonSuspiciousCharactersOnly() {
    this._string = this._string.replaceAll(/[^\w *-]/g, "");
    return this;
  }

  alphaAndHyphensOnly() {
    this._string = this._string.replaceAll(/[^A-Za-z-]/g, "");
    return this;
  }

  alphaAndHyphensSpacesOnly() {
    this._string = this._string.replaceAll(/[^ A-Za-z-]/g, "");
    return this;
  }

  alphaAndHyphensAsteriskSpacesOnly() {
    this._string = this._string.replaceAll(/[^ *A-Za-z-]/g, "");
    return this;
  }

  removeSwears() {
    this._string = cleanUpSwearyString(this._string);
    return this;
  }

  replaceSwearsWith(wordToUseInstead: string) {
    this._string = cleanUpSwearyString(this._string, { wordToUseInstead });
    return this;
  }

  toLowerCase() {
    this._string = this._string.toLowerCase();
    return this;
  }

  capitalizeFirstLetters(joinWith = " ") {
    this._string = capitalizeFirstLetterOfEachWord(this._string, joinWith);
    return this;
  }

  replaceWith(replace: string, replaceWith: string) {
    this._string = replaceAll(this._string, replace, replaceWith);
    return this;
  }

  removeSequentialSpacesAndHyphens() {
    this._string = this._string
      .replaceAll(/-+/g, "-")
      .replaceAll(/ +/g, " ")
      .trim();
    return this;
  }

  build(): string {
    return this._string;
  }
}
