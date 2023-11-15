import type { FC } from "react";
import type { ILoadingSpinner } from "./loading-spinner.types";
import { IconLoading } from "~/components/icons/loading/loading";

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
