export const waitForTimeout = (timeout: number) =>
  new Promise<void>((resolve) => {
    setTimeout(() => resolve(), timeout);
  });
