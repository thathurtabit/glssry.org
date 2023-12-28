export const getPascalCaseFromKebabCase = (kebabCaseString: string, joinString = "") => {
  const pascalCaseString = kebabCaseString
    .split("-")
    .map((word) => (word.at(0) ?? "").toUpperCase() + word.slice(1))
    .join(joinString)
    .split("_")
    .map((word) => (word.at(0) ?? "").toUpperCase() + word.slice(1))
    .join(joinString);
  return pascalCaseString;
};
