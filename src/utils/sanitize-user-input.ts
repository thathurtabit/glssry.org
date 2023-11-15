import { StringSanitizerBuilder } from "./string-sanitizer.builder";

export const sanitizeUserInput = (input: string) => new StringSanitizerBuilder(input)
  .removeDodgyCharacters()
  .build();
