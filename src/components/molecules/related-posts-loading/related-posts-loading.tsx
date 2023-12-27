import type { FC } from "react";
import React from "react";
import { RelatedPostLoading } from "../related-post-loading/related-post-loading";

export const RelatedPostsLoading: FC = () => (
  <aside className="flex flex-col gap-4">
    <RelatedPostLoading />
    <RelatedPostLoading />
  </aside>
);
