import { TagName } from "@prisma/client";
import { z } from "zod";
import { maxPostLinkLength, maxTagsForPost, summaryMaxCharacterCount } from "~/settings/constants";

export const ZNativeTagEnum = z.nativeEnum(TagName);
export type TNativeTagEnum = z.infer<typeof ZNativeTagEnum>;

// Note: Prisma generates TagName as an overloaded type so we can't use it directly
// Also: zod enums are a pain to work with so we're using a workaround
const tagKeys = Object.values(TagName as Record<string, string>);

export const postSchema = z.object({
  title: z.string().min(1).max(100),
  acronym: z.string().min(1).max(10),
  abbreviation: z.string().min(1).max(15),
  initialism: z.string().min(1).max(10),
  link: z.string().min(5).url().max(maxPostLinkLength),
  body: z.string().min(1).max(summaryMaxCharacterCount), // Check schema.prisma
  tags: z.array(ZNativeTagEnum).min(1).max(maxTagsForPost),
  fileUnder: z.string().min(1).max(100).refine((val) => tagKeys.includes(val)),
});

export type TPostKeys = keyof z.infer<typeof postSchema>;
export type TPost = z.infer<typeof postSchema>;

