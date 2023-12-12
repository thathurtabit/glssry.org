export const removeItemFromArrayAtIndex = <Type>(array: Type[], index: number): Type[] => [...array.slice(0, index), ...array.slice(index + 1)];
