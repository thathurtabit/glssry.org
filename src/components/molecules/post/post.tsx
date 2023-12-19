import type { FC } from "react";
import type { TTRPCReadPost } from "~/types/prisma.types";
import React from "react";
import { getFormattedDate } from "~/utils/get-formatted-date";
import { Link } from "~/components/atoms/link/link";
import { IconAccount } from "~/components/icons/account/account";
import { IconExternalLink } from "~/components/icons/external-link/external-link";
import { HorizontalRule } from "~/components/atoms/hr/hr";
import { SectionSubtitle } from "~/components/atoms/section-subtitle/section-subtitle";

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
  } = latestVersion;

  const { username: originalAuthorUsername } = originalAuthor;

  const { username: latestAuthorUsername } = latestAuthor;

  return (
    <section className="p-4 text-copy max-w-3xl">
      <h1 className="mb-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        {title}
      </h1>

      <p className="first-line:uppercase first-line:font-sub-heading md:first-line:text-lg lg:first-line:text-2xl md:text-lg">
        {body}
      </p>

      <dl className="flex gap-5 my-4">
        <div>
          <dt className="text-[0.5rem] uppercase opacity-50">Abbreviation:</dt>
          <dd>{abbreviation}</dd>
        </div>
        <div>
          <dt className="text-[0.5rem] uppercase opacity-50">Acronym:</dt>
          <dd>{acronym}</dd>
        </div>
        <div>
          <dt className="text-[0.5rem] uppercase opacity-50">Initialism:</dt>
          <dd>{initialism}</dd>
        </div>
      </dl>

      <div className="flex gap-5 text-xs">
        <div className="flex gap-2 text-xs items-center mb-5">
          <SectionSubtitle className="text-[0.5rem] opacity-50">
            Author
          </SectionSubtitle>
          <p className="flex gap-2 text-xs items-center mb-5">
            <IconAccount />
            <span>{originalAuthorUsername}</span> |{" "}
            <span>{getFormattedDate({ date: createdAt })}</span>
          </p>
        </div>
        <div className="flex gap-2 text-xs items-center mb-5">
          <SectionSubtitle className="text-[0.5rem] opacity-50">
            Last update
          </SectionSubtitle>
          <p className="flex gap-2 text-xs items-center mb-5">
            <IconAccount />
            <span>{latestAuthorUsername}</span> |{" "}
            <span>{getFormattedDate({ date: createdAt })}</span>
          </p>
        </div>
      </div>

      <Link href={link} target="_blank" rel="noopener noreferrer" size="small">
        Learn more <IconExternalLink />
      </Link>

      <HorizontalRule />

      <div className="flex gap-2 text-xs">
        <p>File under: {fileUnder}</p>
        <p>Versions: {versions.length}</p>
      </div>
    </section>
  );
};
