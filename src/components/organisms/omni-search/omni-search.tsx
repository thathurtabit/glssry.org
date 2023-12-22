import type { ChangeEvent, FC } from "react";
import React, { useState } from "react";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { LoadingSpinner } from "~/components/atoms/loading-spinner/loading-spinner";
import { IconArchive } from "~/components/icons/archive/archive";
import { IconCancel } from "~/components/icons/cancel/cancel";
import { IconError } from "~/components/icons/error/error";
import { IconSearch } from "~/components/icons/search/search";
import { useRouterEvent } from "~/hooks/page/use-router-event.hook";
import { useSearchPublishedPosts } from "~/hooks/post/search-published-posts.hook";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";

export const OmniSearch: FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleClearSearchTerm = () => {
    setSearchTerm("");
  };

  useRouterEvent({ callback: handleClearSearchTerm });

  const {
    searchedPublishedPostsData,
    searchedPublishedPostsDataIsFetching,
    searchedPublishedPostsDataHasError,
  } = useSearchPublishedPosts({ searchTerm });

  const handleSearchTermChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="border-b-[1px] border-divider bg-background grid h-header grid-cols-10 fixed left-0 right-0 top-header justify-center items-center md:max-w-md md:top-0 md:left-1/2 md:-translate-x-1/2 md:h-header">
      <span className="inline-flex col-start-1 items-center justify-center">
        <IconSearch className="text-sm" />
      </span>
      <div className="grid col-span-8 relative">
        <input
          type="text"
          value={searchTerm}
          placeholder="Search posts"
          className="bg-background border-0 text-copy p-2 text-sm font-sub-heading"
          onChange={handleSearchTermChange}
        />
        {searchedPublishedPostsDataIsFetching ? (
          <span className="absolute animate-spin right-5 -translate-y-1/2 top-1/2">
            <LoadingSpinner />
          </span>
        ) : null}
        {searchedPublishedPostsDataHasError ? (
          <span className="absolute animate-spin right-5 -translate-y-1/2 top-1/2">
            <IconError />
          </span>
        ) : null}
      </div>
      {searchTerm ? (
        <button
          type="button"
          className="border-0 inline-flex col-start-10 items-center justify-center"
          onClick={handleClearSearchTerm}
        >
          <IconCancel className="text-lg" />
        </button>
      ) : null}
      {searchedPublishedPostsData ? (
        <dialog
          open
          className="top-full bg-background text-copy absolute m-0 w-full right-0 left-0 items-center justify-center flex drop-shadow-lg"
        >
          <ul className="bg-background-light top-full w-full text-sm">
            {searchedPublishedPostsData?.map(({ id, title, versions }) => {
              const { fileUnder, slug } = versions.at(-1) ?? {};
              const category = getKebabCaseFromSentenceCase(fileUnder ?? "");
              return (
                <div key={id} className="flex gap-2 text-copy p-2">
                  <LinkText
                    href={`${category}/${slug}`}
                    className="p-2 w-full gap-2 flex justify-between"
                  >
                    <span>{title}</span>
                    {fileUnder ? (
                      <span className="flex gap-1 items-center">
                        <IconArchive />
                        {fileUnder}
                      </span>
                    ) : null}
                  </LinkText>
                </div>
              );
            })}
          </ul>
        </dialog>
      ) : null}
    </section>
  );
};
