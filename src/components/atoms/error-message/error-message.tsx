import type { FC } from "react";
import type { IErrorMessage } from "./error-message.types";
import { IconError } from "~/components/icons/error/error";

export const ErrorMessage: FC<IErrorMessage> = ({
  title,
  text,
  className,
  Icon,
}) => (
  <section
    className={`min-['600px']: my-4 flex max-w-sm flex-col justify-start rounded-lg border-red-700 bg-white px-5 py-3 pb-4 ${className}`}
  >
    <h3 className="mb-1 flex flex-row items-center justify-start text-black">
      {Icon ? <Icon /> : <IconError className="mr-2 text-red-700" />}
      {title}
    </h3>
    <p className="text-sm text-black">{text}</p>
  </section>
);
