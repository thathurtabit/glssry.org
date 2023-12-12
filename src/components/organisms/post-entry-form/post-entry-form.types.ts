import type { ChangeEvent } from "react";
import type { TPost } from "~/schemas/post/post.schema";

export interface IPostEntryForm {
  mode: "create" | "edit";
  postData?: TPost | null;
}

export type TPostEntryEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>
