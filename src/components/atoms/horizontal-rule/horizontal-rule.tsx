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
      className={`${positionStyles} my-6 h-[1px] w-full border-copy border-none bg-primary-dark ${hrColor} ${className}`}
    />
  );
};
