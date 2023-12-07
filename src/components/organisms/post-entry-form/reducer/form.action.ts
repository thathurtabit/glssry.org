import type { TPostKeys } from "~/schemas/post/post.schema";

export const postAction = (type: TPostKeys, payload: unknown) => ({
  type,
  payload,
});
