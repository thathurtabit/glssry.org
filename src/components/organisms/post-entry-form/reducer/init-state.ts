import type { TPost } from "~/schemas/post/post.schema";

export const initState: TPost = {
  title: "",
  acronym: "",
  abbreviation: "",
  initialism: "",
  link: "",
  body: "",
  fileUnder: "Art",
  tags: ["Uncategorized"],
};
