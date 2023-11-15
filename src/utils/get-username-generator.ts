import { usernames } from "~/data/nicknames";
import { getRandomItemFromArray } from "./get-random-item-from-array";

interface IUniqueUsernameGenerator {
  dictionary?: string[],
  separator?: string,
  style?: "capital" | "lowercase" | "uppercase",
  randomDigits?: number,
}

export const getRandomUsername = (config: IUniqueUsernameGenerator) => {
  const { dictionary = usernames, separator = "-", style, randomDigits = 5 } = config;
  const randomWord = getRandomItemFromArray<string>(dictionary);
  const randomNumbers = Math.floor((Math.random() * 10) ** randomDigits);
  const username = `${randomWord}${separator}stopper${separator}${randomNumbers}`;
  return style === "capital" ? username.at(0)?.toUpperCase() ?? String(username.slice(1)) : (style === "uppercase" ? username.toUpperCase() : username.toLocaleLowerCase().replaceAll(" ", separator));
};
