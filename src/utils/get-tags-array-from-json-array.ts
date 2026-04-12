import type { Prisma } from "~/generated/prisma/client";

export const getTagsArrayFromJsonArray = (jsonTags: Prisma.JsonValue | undefined): string[] => jsonTags ? Array.isArray(jsonTags) ? (jsonTags as { name: string }[]).map(({ name }) => name) : typeof (jsonTags) === "string" ? JSON.parse(jsonTags) as string[] : [] : [];
