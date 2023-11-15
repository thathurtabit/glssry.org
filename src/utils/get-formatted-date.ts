import { getDateMonthName } from "./get-date-month-name";
import { getDateSuffix } from "./get-date-suffix";

export interface IGetFormattedDate {
  date?: Date | null
  /** Returns dd/mm/yy */
  withSlashes?: boolean
}

const getLastTwoDigits = (number_: number) => number_.toString().slice(-2);

export const getFormattedDate = ({ date, withSlashes = false }: IGetFormattedDate): string => {
  if (!date) {
    return "n/a";
  }

  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  if (withSlashes) {
    return `${day}/${month + 1}/${getLastTwoDigits(year)}`;
  }

  return `${getDateSuffix(day)} ${getDateMonthName(month)}, ${year}`;
};
