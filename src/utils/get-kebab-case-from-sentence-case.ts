export const getKebabCaseFromSentenceCase = (sentenceCaseString: string) => {
  const kebabCaseString = sentenceCaseString.replaceAll(/[^a-zA-Z0-9 ]/g, "").split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
  return kebabCaseString;
};
