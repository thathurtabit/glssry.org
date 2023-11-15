export const addLeadingZerosToYear = (number: number): string => {
  const numberToString = number.toString();
  let numberToUpdate = numberToString;
  if (numberToString.length === 4) {
    return numberToString;
  }

  while (numberToUpdate.length < 4) {
    numberToUpdate = `0${numberToUpdate}`;
  }

  return numberToUpdate;
};
