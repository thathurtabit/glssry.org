"use client";
import { useEffect, useState } from "react";

const getHash = () =>
  globalThis.window === undefined
    ? undefined
    : decodeURIComponent(globalThis.location.hash.replace("#", ""));

/** Get has from current URL */
export const useURLHash = () => {
  const [hash, setHash] = useState(getHash());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleHashChange = () => {
      setHash(getHash());
    };

    globalThis.addEventListener("hashchange", handleHashChange);
    return () => {
      globalThis.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return isClient ? hash : null;
};
