import type { FC } from "react";

import type { IHR } from "./horizontal-rule.types";

export const HorizontalRule: FC<IHR> = ({ className, inverse, position }) => {
  const hrColor = inverse ? "border-divider" : "border-divider";
  const getPositionStyles = () => {
    switch (position) {
      case "right": {
        return "ml-auto";
      }

      case "left": {
        return "mr-auto";
      }

      default: {
        return "mx-auto";
      }
    }
  };

  const positionStyles = getPositionStyles();
  return (
    <hr
      className={`${positionStyles} my-6 border-b h-0 w-full  bg-primary-dark ${hrColor} ${className}`}
    />
  );
};
