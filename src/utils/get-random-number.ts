export const getRandomNumber = (max: number, min = 0) => {
  const maxNumber = Math.floor(max);
  const minNumber = Math.ceil(min);
  return Math.floor((Math.random() * (maxNumber - minNumber)) + minNumber); // The maximum is exclusive and the minimum is inclusive
};
