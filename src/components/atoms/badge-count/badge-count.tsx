import type { FC } from "react";

import type { IBadgeCount, TBadgeCountType } from "./badge-count.types";

const getTypeStyles = (type: TBadgeCountType) => {
  switch (type) {
    case "inverse": {
      return "bg-copy text-gray-800";
    }

    default: {
      return "bg-gray-800 text-copy";
    }
  }
};

export const BadgeCount: FC<IBadgeCount> = ({
  count,
  className,
  type = "default",
}) => {
  const typeStyles = getTypeStyles(type);

  return (
    <span
      className={`absolute aspect-square bg-copy text-[9px] inline-flex items-center justify-center font-medium w-4 h-4 text-center rounded-full  ${typeStyles} ${className}`}
    >
      {count}
    </span>
  );
};
