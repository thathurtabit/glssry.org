import type { TPostKeys } from "~/schemas/post/post.schema";

export type TPostAction = {
  type: TPostKeys | "reset";
  payload: unknown;
}
