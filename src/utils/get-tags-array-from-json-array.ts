import type { JsonValue } from "@prisma/client/runtime/library";

export const getTagsArrayFromJsonArray = (jsonArray: JsonValue): string[] => jsonArray ? JSON.parse(jsonArray as string) as string[] : [];
