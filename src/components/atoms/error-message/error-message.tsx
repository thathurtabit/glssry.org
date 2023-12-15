import type { FC } from "react";
import type { IErrorMessage } from "./error-message.types";
import { IconError } from "~/components/icons/error/error";
import {
  infoPanelBody,
  infoPanelHeading,
  infoPanelWrapper,
} from "~/styles/shared";

export const ErrorMessage: FC<IErrorMessage> = ({
  title,
  text,
  className,
  Icon,
}) => (
  <section
    className={`${infoPanelWrapper} border-red-700 rounded-sm bg-white ${className}`}
  >
    <h3 className={`${infoPanelHeading} text-black`}>
      {Icon ? <Icon /> : <IconError className="mr-2 text-red-700" />}
      {title}
    </h3>
    <p className={`${infoPanelBody} text-black`}>{text}</p>
  </section>
);
