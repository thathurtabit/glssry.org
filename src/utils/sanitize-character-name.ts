import { StringSanitizerBuilder } from "./string-sanitizer.builder";

export const sanitizeCharacterName = (name: string) => new StringSanitizerBuilder(name)
  .removeSwears()
  .alphaAndHyphensAsteriskSpacesOnly()
  .capitalizeFirstLetters()
  .removeSequentialSpacesAndHyphens()
  .build();

