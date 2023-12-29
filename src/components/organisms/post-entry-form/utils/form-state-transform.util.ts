import type { TPost } from "~/schemas/post/post.schema";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";

/** Used to do any final formatting before saving to db */
export const formStateTransform = (state: TPost): TPost => ({
  ...state,
  title: state.title.trim(),
  slug: getKebabCaseFromSentenceCase(state.slug.trim()),
  acronym: state.acronym.trim(),
  abbreviation: state.abbreviation.trim(),
  initialism: state.initialism.trim(),
  link: state.link.trim(),
  body: state.body.trim(),
  relatedPostId1: state.relatedPostId1?.trim() ?? "",
  relatedPostId2: state.relatedPostId2?.trim() ?? "",
});
