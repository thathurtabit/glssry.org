import { TagName } from "@prisma/client";
import { z } from "zod";

import {
 emptySelectOption, maxPostLinkLength, maxTagsForPost, summaryMaxCharacterCount,
} from "~/settings/constants";

export const ZNativeTagEnum = z.nativeEnum(TagName);
export type TNativeTag = z.infer<typeof ZNativeTagEnum>;

// Note: Prisma generates TagName as an overloaded type so we can't use it directly
// Also: zod enums are a pain to work with so we're using a workaround
export const tagKeys: TNativeTag[] = Object.values<TNativeTag>(TagName);

export const tagsKeysWithSelectInstruction = [emptySelectOption, ...tagKeys];

export const postSchema = z.object({
  title: z.string().min(1).max(100),
  slug: z.string().min(1).max(150),
  acronym: z.string().min(1).max(10),
  abbreviation: z.string().min(1).max(15),
  initialism: z.string().min(1).max(10),
  link: z.string().min(5).url().max(maxPostLinkLength),
  body: z.string().min(1).max(summaryMaxCharacterCount).refine((value) => !(value.includes("[") || value.includes("]")), { message: "Double check this text is valid" }), // Check schema.prisma
  tags: z.array(ZNativeTagEnum).min(1).max(maxTagsForPost).refine((tags) => tags.some((tag) => tag !== "Miscellaneous" && (tag as string) !== emptySelectOption), { message: `Please ${emptySelectOption.toLocaleLowerCase()}` }).optional(),
  fileUnder: ZNativeTagEnum.refine((value) => (value as string) !== emptySelectOption, { message: `Please ${emptySelectOption.toLocaleLowerCase()}` }),
  relatedPostId1: z.string().optional(),
  relatedPostId2: z.string().optional(),
});

export type TPostKeys = keyof z.infer<typeof postSchema>;
export type TPost = z.infer<typeof postSchema>;

