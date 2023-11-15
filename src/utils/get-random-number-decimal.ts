export const getRandomNumberDecimal = (max = 5, min = -2.5): number =>
  Number(((Math.random() * (max - min)) + min).toFixed(2));

