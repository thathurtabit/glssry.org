import type { IInfoIcon } from "./info-panel-icon.types";
import { LoadingSpinner } from "../loading-spinner/loading-spinner";
import { IconError } from "~/components/icons/error/error";
import { IconInfo } from "~/components/icons/info/info";
import { IconWarning } from "~/components/icons/warning/warning";
import { IconConfirm } from "~/components/icons/confirm/confirm";

export const InfoIcon = ({ type, className, ...rest }: IInfoIcon) => {
  switch (type) {
    case "error": {
      return <IconError className={className} {...rest} />;
    }

    case "warning": {
      return <IconWarning className={className} {...rest} />;
    }

    case "pending": {
      return <LoadingSpinner className={className} {...rest} />;
    }

    case "success": {
      return <IconConfirm className={className} {...rest} />;
    }

    default: {
      return <IconInfo className={className} {...rest} />;
    }
  }
};
