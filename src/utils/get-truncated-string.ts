export const getTruncatedString = (str: string, length = 100) => {
  if (str.length <= length) {
    return str;
  }

  return `${str.slice(0, length)}...`;
};
