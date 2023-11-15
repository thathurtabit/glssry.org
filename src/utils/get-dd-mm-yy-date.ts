export interface IGetDDMMYYDate {
  date: Date
}

const getLastTwoDigits = (number_: number) => Number(number_.toString().slice(-2));

export const getDDMMYYDate = ({ date }: IGetDDMMYYDate) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { dd: day, mm: month, yy: getLastTwoDigits(year) };
};
