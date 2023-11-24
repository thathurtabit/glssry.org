import type { FC } from "react";
import { HorizontalRule } from "../hr/hr";
import type { IPageIntro } from "./page-intro.types";

export const PageIntro: FC<IPageIntro> = ({ textList, hrProps, showHR = true }) => (
  <section className="bottom-2 mb-3 lg:mb-6 font-body">
    {textList.map((text, index) => (
      <p
        key={text?.toString()}
        className={`mb-2 ${
          index === 0 ? "text-md font-sub-heading" : "text-sm"
        }`}
      >
        {text}
      </p>
    ))}
    {showHR && (
      <HorizontalRule
        {...hrProps}
        position={hrProps?.position ?? "left"}
        className={hrProps?.className ?? "mb-2 mt-8"}
      />
    )}
  </section>
);
