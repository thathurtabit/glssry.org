import { usePathname } from "next/navigation";
import type { TNativeTag } from "~/schemas/post/post.schema";
import { api } from "~/utils/api";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";

export interface IUseReadAllPostsInCategory {
  categories: TNativeTag[];
}

export const useReadRandomisedRelatedPosts = ({
  categories,
}: IUseReadAllPostsInCategory) => {
  const pathname = usePathname();
  const { data, isFetching, error, isError } =
    api.post.readRandomisedRelatedPosts.useQuery(
      { categories },
      {
        enabled: Boolean(categories),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
      }
    );

  const filteredData = data?.filter(({ versions }) => {
    const latestVersion = versions.at(-1);
    const { slug, fileUnder } = latestVersion ?? {};
    const pathnameFromTRPCData = `/${getKebabCaseFromSentenceCase(
      fileUnder ?? ""
    )}/${slug}`;

    return pathnameFromTRPCData !== pathname;
  });

  return {
    randomisedRelatedPosts: filteredData,
    randomisedRelatedPostsIsFetching: isFetching,
    randomisedRelatedPostsHasError: isError,
    randomisedRelatedPostsError: error,
  };
};
