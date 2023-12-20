import type { ChangeEvent, FC } from "react";
import React, { Fragment, useState } from "react";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { IconArchive } from "~/components/icons/archive/archive";
import { useSearchPublishedPosts } from "~/hooks/post/search-published-posts.hook";

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
    <section className="flex flex-col fixed left-0 right-0 top-14">
      <input
        type="text"
        value={searchTerm}
        placeholder="Search posts"
        className="border-0 bg-background-dark text-copy p-2"
        onChange={handleSearchTermChange}
      />
      {searchedPublishedPostsDataIsFetching && <LoadingSpinner />}
      {searchedPublishedPostsDataHasError && <p>Error</p>}
      {searchedPublishedPostsData?.map(({ id, title, versions }) => {
        const { fileUnder } = versions.at(-1) ?? {};
        return (
          <div key={id}>
            {title}{" "}
            {fileUnder ? (
              <Fragment>
                | <IconArchive />
                {fileUnder}
              </Fragment>
            ) : null}
          </div>
        );
      })}
    </section>
  );
};
