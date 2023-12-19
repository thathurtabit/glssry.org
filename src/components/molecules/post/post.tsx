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
  } = latestVersion;

  const { username: originalAuthorUsername, image: originalAuthorImageURL } =
    originalAuthor;

  const { username: latestAuthorUsername, image: latestAuthorImageURL } =
    latestAuthor;

  const shouldShowUpdatedBy = latestAuthorUsername !== originalAuthorUsername;

  const smallTextStyles = "text-[0.5rem] opacity-50 uppercase";

  return (
    <section className="p-4 text-copy max-w-4xl">
      <h1 className="mb-6 md:mb-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        {title}
      </h1>

      <div className="max-w-2xl">
        <p className="first-line:uppercase first-line:font-sub-heading md:first-line:text-lg lg:first-line:text-xl md:text-lg">
          {body}
        </p>

        <div className="flex gap-5 items-center justify-between text-xs mb-5">
          <dl className="flex gap-5 my-4">
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
          <div className="flex text-xs items-end flex-col justify-end">
            <SectionSubtitle className={`${smallTextStyles} mb-0 text-right`}>
              Added by:
            </SectionSubtitle>
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
              <SectionSubtitle className={`${smallTextStyles} mb-0 text-right`}>
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
            <IconArchive /> File under: {fileUnder}
          </p>
          <p>Version: {versions.length}</p>
        </div>
      </div>
    </section>
  );
};
