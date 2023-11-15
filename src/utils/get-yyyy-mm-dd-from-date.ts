import { addLeadingZeroToNumber } from "./add-leading-zero-to-number";

export const getYYYMMDDFromDate = (date: Date) => {
  const year = date.getFullYear();
  const month = addLeadingZeroToNumber(date.getMonth() + 1);
  const day = addLeadingZeroToNumber(date.getDate());
  return `${year}-${month}-${day}`;
};
