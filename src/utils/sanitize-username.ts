import { StringSanitizerBuilder } from "./string-sanitizer.builder";

export const sanitizeUsername = (string: string) => new StringSanitizerBuilder(string)
  .removeSwears()
  .replaceWith(" ", "-")
  .nonSuspiciousCharactersOnly()
  .toLowerCase()
  .removeSequentialSpacesAndHyphens()
  .build();
