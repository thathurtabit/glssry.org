import type { FC } from "react";
import React from "react";
import type { TPost } from "./post.types";

export const Post: FC<TPost> = ({
  id,
  title,
  author,
  authorId,
  createdAt,
  versions,
}) => (
  <section>
    <ul>
      <li>{id}</li>
      <li>{title}</li>
      <li>{authorId}</li>
      <li>{author?.username}</li>
      <li>{new Date(createdAt).getUTCDate()}</li>
      <li>{versions.length}</li>
    </ul>
  </section>
);
