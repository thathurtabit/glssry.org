export const getKebabCaseFromSentenceCase = (sentenceCaseString: string) => {
  const kebabCaseString = sentenceCaseString
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
  return kebabCaseString;
};
