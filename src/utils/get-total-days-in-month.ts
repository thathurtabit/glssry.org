/** Note: Month is NOT zero-based here: Jan = 1 */
export const getTotalDaysInMonth = (month: number, year: number): number => new Date(year, month, 0).getDate();
