import { TagName } from "@prisma/client";
import { z } from "zod";

import { emptySelectOption, summaryMaxCharacterCount } from "~/settings/constants";

export const ZNativeTagEnum = z.nativeEnum(TagName);

export const newPostEmailSchema = z.object({
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(summaryMaxCharacterCount).refine((value) => !(value.includes("[") || value.includes("]")), { message: "Double check this text is valid" }), // Check schema.prisma
  fileUnder: ZNativeTagEnum.refine((value) => (value as string) !== emptySelectOption, { message: `Please ${emptySelectOption.toLocaleLowerCase()}` }),
});

export type TNewPostEmailSchema = z.infer<typeof newPostEmailSchema>;

