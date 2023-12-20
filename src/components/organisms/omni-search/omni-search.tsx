import type { ChangeEvent, FC } from "react";
import React, { Fragment, useState } from "react";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { IconArchive } from "~/components/icons/archive/archive";
import { useSearchPublishedPosts } from "~/hooks/post/search-published-posts.hook";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";

export const OmniSearch: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    searchedPublishedPostsData,
    searchedPublishedPostsDataIsFetching,
    searchedPublishedPostsDataHasError,
  } = useSearchPublishedPosts({ searchTerm });

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="flex flex-col fixed left-0 right-0 top-[52px] z-40">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search posts"
        className="border-0 bg-background-dark text-copy p-2"
        onChange={handleSearchTermChange}
      />
      {searchedPublishedPostsDataIsFetching && <LoadingSpinner />}
      {searchedPublishedPostsDataHasError && <p>Error</p>}
      {searchedPublishedPostsData ? (
        <ul className="absolute bg-background top-full left-0 right-0">
          {searchedPublishedPostsData?.map(({ id, title, versions }) => {
            const { fileUnder, slug } = versions.at(-1) ?? {};
            const category = getKebabCaseFromSentenceCase(fileUnder ?? "");
            return (
              <div key={id} className=" flex gap-2 text-copy p-2">
                <LinkText href={`${category}/${slug}`}>
                  {title}{" "}
                  {fileUnder ? (
                    <Fragment>
                      | <IconArchive />
                      {fileUnder}
                    </Fragment>
                  ) : null}
                </LinkText>
              </div>
            );
          })}
        </ul>
      ) : null}
    </section>
  );
};
