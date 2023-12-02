import type { FC } from "react";
import type { IHR } from "./hr.types";

export const HorizontalRule: FC<IHR> = ({ className, inverse, position }) => {
  const hrColor = inverse ? "bg-copy-inverse" : "bg-copy";
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
      className={`${positionStyles} my-4 h-0 w-full max-w-[100px] border-copy border-2 bg-primary-dark ${hrColor} ${className}`}
    />
  );
};
