export const getShuffledArray = <ArrayType>([...array]: ArrayType[]): ArrayType[] => {
  if (array.length <= 1) {
    return array;
  }

  for (let index = array.length - 1; index > 0; index--) {
    const index_ = Math.floor(Math.random() * (index + 1));
    const temporary = array[index];
    array[index] = array[index_] as ArrayType;
    array[index_] = temporary as ArrayType;
  }

  return array;
};
