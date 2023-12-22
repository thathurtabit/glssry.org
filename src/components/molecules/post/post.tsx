import type { FC } from "react";
import type { TTRPCReadPost } from "~/types/prisma.types";
import React from "react";
import { getFormattedDate } from "~/utils/get-formatted-date";
import { Link } from "~/components/atoms/link/link";
import { IconAccount } from "~/components/icons/account/account";
import { IconExternalLink } from "~/components/icons/external-link/external-link";
import { HorizontalRule } from "~/components/atoms/hr/hr";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";
import Image from "next/image";
import { IconArchive } from "~/components/icons/archive/archive";
import { LinkText } from "~/components/atoms/link-text/link-text";
import { getKebabCaseFromSentenceCase } from "~/utils/get-kebab-case-from-sentence-case";
import { RelatedPosts } from "../related-posts/related-posts";

export const Post: FC<NonNullable<TTRPCReadPost>> = ({
  author: originalAuthor,
  createdAt,
  versions,
}) => {
  const latestVersion = versions.at(-1);

  if (!latestVersion) {
    return <p>No information found</p>;
  }

  const {
    abbreviation,
    acronym,
    author: latestAuthor,
    body,
    fileUnder,
    initialism,
    link,
    title,
    updatedAt,
    relatedPostId1,
    relatedPostId2,
  } = latestVersion;

  const { username: originalAuthorUsername, image: originalAuthorImageURL } =
    originalAuthor;

  const { username: latestAuthorUsername, image: latestAuthorImageURL } =
    latestAuthor;

  const shouldShowUpdatedBy = latestAuthorUsername !== originalAuthorUsername;

  const smallTextStyles = "text-[0.5rem] opacity-50 uppercase";

  const hasRelatedPosts = Boolean(relatedPostId1) || Boolean(relatedPostId2);

  return (
    <article className="text-copy w-full max-w-4xl">
      <h1 className="mb-6 md:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        {title}
      </h1>
      <div className="flex flex-col lg:flex-row gap-5 md:gap-14">
        <div className="flex-1 max-w-xl w-full">
          <p className="first-line:uppercase first-line:font-sub-heading md:first-line:text-lg lg:first-line:text-xl md:text-lg">
            {body}
          </p>
          <div className="flex gap-1 justify-between text-xs mb-10 flex-col md:flex-row md:items-center md:gap-5">
            <dl className="flex gap-5 my-2 md:my-4">
              <div>
                <dt className={`${smallTextStyles} mb-0`}>Abbreviation:</dt>
                <dd>{abbreviation}</dd>
              </div>
              <div>
                <dt className={`${smallTextStyles} mb-0`}>Acronym:</dt>
                <dd>{acronym}</dd>
              </div>
              <div>
                <dt className={`${smallTextStyles} mb-0`}>Initialism:</dt>
                <dd>{initialism}</dd>
              </div>
            </dl>
            <div className="flex text-xs md:items-end flex-col justify-end">
              <h4 className={`${smallTextStyles} font-body mb-0 md:text-right`}>
                Added by:
              </h4>
              <p
                className="flex gap-2 text-xs items-center m-0"
                title={`Created: ${getFormattedDate({
                  date: createdAt,
                })} by ${originalAuthorUsername}`}
              >
                {originalAuthorImageURL ? (
                  <Image
                    src={originalAuthorImageURL}
                    alt={originalAuthorUsername ?? "Original author"}
                    width={15}
                    height={15}
                    className="rounded-full aspect-square"
                  />
                ) : (
                  <IconAccount />
                )}
                <span>{originalAuthorUsername}</span>
              </p>
            </div>
            {shouldShowUpdatedBy ? (
              <div className="flex text-xs items-end flex-col justify-end">
                <SectionSubtitle
                  className={`${smallTextStyles} mb-0 text-right`}
                >
                  Edited by:
                </SectionSubtitle>
                <p
                  className="flex gap-2 text-xs items-center m-0"
                  title={`Updated: ${getFormattedDate({
                    date: updatedAt,
                  })} by ${latestAuthorUsername}`}
                >
                  {latestAuthorImageURL ? (
                    <Image
                      src={latestAuthorImageURL}
                      alt={latestAuthorUsername ?? "Editor"}
                      width={15}
                      height={15}
                      className="rounded-full aspect-square"
                    />
                  ) : (
                    <IconAccount />
                  )}
                  <span>{latestAuthorUsername}</span>
                </p>
              </div>
            ) : null}
          </div>
          <Link
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            size="small"
          >
            Learn more <IconExternalLink />
          </Link>

          <HorizontalRule />

          <div className={`flex justify-between gap-2 ${smallTextStyles}`}>
            <p className="flex gap-1 items-center">
              <IconArchive /> File under:{" "}
              <LinkText href={getKebabCaseFromSentenceCase(fileUnder)}>
                {fileUnder}
              </LinkText>
            </p>
            <p>Version: {versions.length}</p>
          </div>
        </div>
        {hasRelatedPosts ? (
          <RelatedPosts slugs={[relatedPostId1 ?? "", relatedPostId2 ?? ""]} />
        ) : null}
      </div>
    </article>
  );
};
