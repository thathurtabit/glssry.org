import type { ComponentType } from "react";
import type { IconBaseProps } from "react-icons";

export const infoTypes = ["info", "success", "warning", "error", "pending"] as const;
export type TInfoTypes = typeof infoTypes[number];

export type TButtonVariant = "action" | "action-inactive" | "primary" | "secondary" | "tertiary" | "danger" | "disabled";

export interface INotification {
  uuid: string;
  type: TInfoTypes;
  title: string;
  message: string;
  Icon?: ComponentType<IconBaseProps>;
}

export type TJustifyContent = "start" | "end" | "center" | "between" | "around" | "evenly";

export type TInputWidth = "small" | "full";

export type TInputSize = "default" | "small";

export type TBackground = "light" | "dark";
