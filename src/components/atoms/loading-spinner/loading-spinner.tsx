import type { FC } from "react";

import { IconLoading } from "~/components/icons/loading/loading";

import type { ILoadingSpinner } from "./loading-spinner.types";

export const LoadingSpinner: FC<ILoadingSpinner> = ({
  size,
  className,
  ...rest
}) => (
  <IconLoading
    size={size}
    className={`animate-spin ${className}`}
    {...rest}
  />
);
