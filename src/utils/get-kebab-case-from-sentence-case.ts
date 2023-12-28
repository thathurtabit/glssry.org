export const getKebabCaseFromSentenceCase = (sentenceCaseString: string) => {
  const kebabCaseString = sentenceCaseString.replaceAll(/[^a-zA-Z0-9-_ ]/g, "").split(" ")
    .map((word) => word.toLowerCase().replaceAll("_", "-"))
    .join("-");
  return kebabCaseString;
};
