export const cutArrayIntoChunks = <Type, >(array: Type[], chunkSize: number): Type[][] =>
  array.length > chunkSize
    ? [array.slice(0, chunkSize), ...cutArrayIntoChunks(array.slice(chunkSize), chunkSize)]
    : [array];
