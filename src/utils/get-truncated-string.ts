export const getTruncatedString = (string_: string, length = 100) => {
  if (string_.length <= length) {
    return string_;
  }

  return `${string_.slice(0, length)}...`;
};
