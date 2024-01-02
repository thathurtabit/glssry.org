export const getKebabCaseFromSentenceCase = (sentenceCaseString: string) => {
  const kebabCaseString = sentenceCaseString.replaceAll(/[^\w -]/g, "").split(" ")
    .map((word) => word.toLowerCase().replaceAll("_", "-"))
    .join("-");
  return kebabCaseString;
};
