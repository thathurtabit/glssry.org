/**
  * Capitalize the first letter of each word in a string
  * @param {string} string - The string to capitalize
  * @param {string} [splitBy=" "] - The character to split the string by
  * @returns {string} The capitalized string
  *
  * NOTE: This function tries its best, but it's not perfect. It can't handle all the different combinations of replacements
 */

const getCapitalizedFirstLetter = (word: string): string => {
  const firstLetter = word.at(0);
  if (!firstLetter) {
    return word;
  }

  const firstLetterUpperCase = firstLetter?.toUpperCase();
  return firstLetterUpperCase + word.toLowerCase().slice(1);
};

export function capitalizeFirstLetterOfEachWord(string: string, joinWith = " ", splitByA = " ", splitByB = "-"): string {
  const trimmedString = string.trim();

  const splitString = trimmedString
    .split(splitByA)
    .join(splitByB)
    .split(splitByB);

  if (splitString.length <= 1) {
    if (!splitString.at(0)) {
      return string;
    }

    return getCapitalizedFirstLetter(splitString.at(0) ?? "");
  }

  return splitString.map((word) => getCapitalizedFirstLetter(word)).filter(Boolean).join(joinWith);
}
