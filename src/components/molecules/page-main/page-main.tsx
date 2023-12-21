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
        return "justify-start";
      }

      case "end": {
        return "justify-end";
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
      className={`relative mt-header z-1 h-screen py-header px-10 flex flex-1 items-center flex-col self-stretch text-copy w-full ${justifiedContent} ${
        className ?? ""
      }`}
    >
      {children}
    </main>
  );
};
