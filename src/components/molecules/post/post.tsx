import type { FC } from "react";
import type { TTRPCReadPost } from "~/types/prisma.types";
import Image from "next/image";
import React from "react";

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
    id,
    abbreviation,
    acronym,
    authorId,
    author: latestAuthor,
    body,
    fileUnder,
    initialism,
    link,
    postId,
    published,
    title,
  } = latestVersion;

  const { image: originalAuthorImage, username: originalAuthorUsername } =
    originalAuthor;

  const { image: latestAuthorImage, username: latestAuthorUsername } =
    latestAuthor;

  return (
    <section>
      <ul>
        <li>{id}</li>
        <li>{title}</li>
        <li>Original authorId: {authorId}</li>
        <li>{abbreviation}</li>
        <li>{initialism}</li>
        <li>{link}</li>
        <li>{acronym}</li>
        <li>{body}</li>
        <li>{postId}</li>
        <li>{published}</li>
        <li>{fileUnder}</li>
        <li>{originalAuthorUsername}</li>
        <li>
          {latestAuthorImage && (
            <Image
              src={latestAuthorImage}
              alt={latestAuthorUsername ?? "Latest author"}
            />
          )}
        </li>
        <li>
          {originalAuthorImage && (
            <Image
              src={originalAuthorImage}
              alt={originalAuthorUsername ?? "Original author"}
            />
          )}
        </li>
        <li>Created at: {new Date(createdAt).getUTCDate()}</li>
        <li>{versions.length}</li>
      </ul>
    </section>
  );
};
