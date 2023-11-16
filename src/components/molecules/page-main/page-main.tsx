import type { FCC } from "~/types/react.types";
import type { IPageMain } from "./page-main.types";

export const PageMain: FCC<IPageMain> = ({
  children,
  className,
  justifyContent,
}) => {
  const getJustifyContent = () => {
    switch (justifyContent) {
      case "start": {
        return "justify-start mt-16";
      }

      case "end": {
        return "justify-end mb-16";
      }

      case "between": {
        return "justify-between";
      }

      case "around": {
        return "justify-around";
      }

      case "evenly": {
        return "justify-evenly";
      }

      default: {
        return "justify-center";
      }
    }
  };

  const justifiedContent = getJustifyContent();
  return (
    <main
      className={`relative z-1 h-screen p-7 sm:px-20 flex flex-1 flex-col items-center self-stretch ${justifiedContent} ${
        className ?? ""
      }`}
    >
      {children}
    </main>
  );
};
