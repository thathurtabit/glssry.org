import type { JsonValue } from "@prisma/client/runtime/library";

export const getTagsArrayFromJsonArray = (jsonTags: JsonValue | undefined): string[] => jsonTags ? Array.isArray(jsonTags) ? (jsonTags as { name: string }[]).map(({ name }) => name) : typeof (jsonTags) === "string" ? JSON.parse(jsonTags) as string[] : [] : [];
