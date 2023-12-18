export type TBadgeCountType = "default" | "inverse";

export interface IBadgeCount {
  count: number;
  className?: string;
  type?: TBadgeCountType;
}
