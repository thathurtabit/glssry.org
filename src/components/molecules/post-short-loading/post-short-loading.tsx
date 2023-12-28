import type { FC } from "react";
import { postRowItemMetaStyles } from "~/styles/shared";

export const PostShortLoading: FC = () => (
  <article className="relative">
    <div className="py-2 px-4 mb-5 flex flex-col items-start justify-start gap-4 animate-pulse">
      <div className="flex-1 flex flex-col gap-2 w-80">
        <span className="flex items-center gap-1 uppercase opacity-50 text-xs bg-loading h-9 w-64" />
        <span className="flex items-center gap-1 uppercase opacity-50 text-xs bg-loading h-9 w-56" />
      </div>
      <div className="flex-1 flex flex-col gap-2 w-80">
        <span className={`${postRowItemMetaStyles} bg-loading h-4 w-full`} />
        <span className={`${postRowItemMetaStyles} bg-loading h-4 w-full`} />
        <span className={`${postRowItemMetaStyles} bg-loading h-4 w-full`} />
      </div>
      <div className="flex-1 flex gap-4">
        <span className="flex items-center gap-1 uppercase opacity-50 text-xs bg-loading h-8 w-16" />
        <span className="flex items-center gap-1 uppercase opacity-50 text-xs bg-loading h-8 w-16" />
        <span className="flex items-center gap-1 uppercase opacity-50 text-xs bg-loading h-8 w-16" />
      </div>
    </div>
  </article>
);
