import type { TPost } from "~/schemas/post/post.schema";

export const initState: TPost = {
  title: "",
  slug: "",
  acronym: "",
  abbreviation: "",
  initialism: "",
  link: "",
  body: "",
  fileUnder: "Miscellaneous",
  tags: ["Miscellaneous"],
};
