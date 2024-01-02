import type { MouseEvent } from "react";

export interface IShare {
  title: string;
  text: string;
  onInteraction?: (event: MouseEvent<HTMLButtonElement>) => void;
}
