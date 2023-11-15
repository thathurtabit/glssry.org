export const gameNavigationData = ["Player", "Observer", "Undecided"] as const;

export type TGameNavigationTypes = typeof gameNavigationData[number];
