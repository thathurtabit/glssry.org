import type { FC } from "react";

import { postRowItemMetaStyles, postRowWrapperStyles } from "~/styles/shared";

export const RelatedPostLoading: FC = () => (
  <article className={postRowWrapperStyles}>
    <div className="flex flex-1 flex-col items-start justify-start gap-4 animate-pulse">
      <span className="flex gap-1 uppercase opacity-50 text-xs bg-loading h-6 w-36" />
      <div className="flex-1 flex flex-col gap-2 w-80">
        <span className={`${postRowItemMetaStyles} bg-loading h-4 w-full`} />
        <span className={`${postRowItemMetaStyles} bg-loading h-4 w-full`} />
      </div>
      <span className="flex gap-1 uppercase opacity-50 text-xs bg-loading h-4 w-36" />
    </div>
  </article>
);
