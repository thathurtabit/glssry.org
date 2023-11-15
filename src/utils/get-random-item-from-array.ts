export const getRandomItemFromArray = <Type>(items: readonly Type[]): Type => items[Math.floor(Math.random() * items.length)] as Type;
