/** Used to create acronyms / initialism */
export const getFirstLettersOfString = (string: string) => string.split(" ").map((word) => word.at(0) ?? "").join("").toUpperCase();
