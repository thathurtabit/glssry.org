import type { FC } from "react";
import type { TTRPCReadPost } from "~/types/prisma.types";
import React from "react";
import { SectionTitle } from "~/components/atoms/section-title/section-title";
import { getFormattedDate } from "~/utils/get-formatted-date";
import { Link } from "~/components/atoms/link/link";
import { IconAccount } from "~/components/icons/account/account";
import { IconExternalLink } from "~/components/icons/external-link/external-link";

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
    <section className="border-2 border-copy p-4">
      <SectionTitle>{title}</SectionTitle>

      <p>{body}</p>

      <dl className="flex gap-2 my-4">
        <dt>Abbreviation:</dt>
        <dd>{abbreviation}</dd>
        <dt>Acronym:</dt>
        <dd>{acronym}</dd>
        <dt>Initialism:</dt>
        <dd>{initialism}</dd>
      </dl>

      <p className="flex gap-2 text-xs items-center mb-5">
        <IconAccount />
        <span>{originalAuthorUsername}</span> |{" "}
        <span>{getFormattedDate({ date: createdAt })}</span>
      </p>

      <p className="flex gap-2 text-xs items-center mb-5">
        <IconAccount />
        <span>{latestAuthorUsername}</span> |{" "}
        <span>{getFormattedDate({ date: createdAt })}</span>
      </p>

      <Link href={link}>
        Learn more <IconExternalLink />
      </Link>

      <p>File under: {fileUnder}</p>
      <p>Versions: {versions.length}</p>
    </section>
  );
};
