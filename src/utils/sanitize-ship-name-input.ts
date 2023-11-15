import { StringSanitizerBuilder } from "./string-sanitizer.builder";

export const sanitizeShipNameInput = (input: string) => new StringSanitizerBuilder(input)
  .removeSequentialSpacesAndHyphens()
  .removeSwears()
  .alphaAndHyphensAsteriskSpacesOnly()
  .capitalizeFirstLetters()
  .build();
