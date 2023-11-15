export const getPreviousDate = (date: Date, monthsToSkip: number): Date => {
  const result = new Date(date);
  const expectedMonth = (((date.getMonth() - monthsToSkip) % 12) + 12) % 12;
  result.setMonth(result.getMonth() - monthsToSkip);
  if (result.getMonth() !== expectedMonth) {
    result.setDate(0);
  }

  return result;
};
