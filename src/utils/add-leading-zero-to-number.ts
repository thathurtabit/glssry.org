export const addLeadingZeroToNumber = (number: number): string => {
  if (number === 0) {
    return "01";
  }

  return number < 10 ? `0${number}` : `${number}`;
};
