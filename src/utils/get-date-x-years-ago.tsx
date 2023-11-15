export const getDateXYearsAgo = (yearsAgo: number): Date => {
  const todayDate = new Date();
  const todayDay = todayDate.getDate();
  const todayMonth = todayDate.getMonth() + 1;
  const todayMinusYear = todayDate.getFullYear() - yearsAgo;

  return new Date(`${todayMinusYear}-${todayMonth}-${todayDay}`);
};
