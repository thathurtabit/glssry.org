const thExceptions = (date: number) =>
  [11, 12, 13].includes(date);

export const getDateSuffix = (date: number): string => {
  const lastDigit = date % 10;

  if (thExceptions(date) || lastDigit === 0 || lastDigit > 3) {
    return `${date}th`;
  }

  if (lastDigit === 1) {
    return `${date}st`;
  }

  if (lastDigit === 2) {
    return `${date}nd`;
  }

  return `${date}rd`;
};
