export const padZero = (time: number, maxPadding = 3): string => time.toString().padStart(maxPadding, "0");
