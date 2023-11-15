export enum EVariantKeys {
  HIDDEN = "hidden",
  ENTER = "enter",
  EXIT = "exit",
}

export const variants = {
  [EVariantKeys.HIDDEN]: { opacity: 0, y: 10 },
  [EVariantKeys.ENTER]: { opacity: 1, y: 0 },
  [EVariantKeys.EXIT]: { opacity: 0, y: -10 },
};
