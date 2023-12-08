import type { TPostAction } from "./form.reducer.types";
import type { TPost } from "~/schemas/post/post.schema";

export const postReducer = (state: TPost, { type, payload }: TPostAction): TPost => {
  console.log({ type, payload });
  switch (type) {
    case "title":
      return { ...state, title: payload as TPost["title"] };
    case "acronym":
      return { ...state, acronym: payload as TPost["acronym"] };
    case "abbreviation":
      return { ...state, abbreviation: payload as TPost["abbreviation"] };
    case "initialism":
      return { ...state, initialism: payload as TPost["initialism"] };
    case "link":
      return { ...state, link: payload as TPost["link"] };
    case "body":
      return { ...state, body: payload as TPost["body"] };
    case "fileUnder":
      return { ...state, fileUnder: payload as TPost["fileUnder"] };
    case "tags":
      return { ...state, tags: payload as TPost["tags"] };
    default:
      return state;
  }
};
