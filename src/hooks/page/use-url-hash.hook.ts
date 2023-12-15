"use client";
import { useEffect, useState } from "react";

const getHash = () =>
  typeof window === "undefined"
    ? undefined
    : decodeURIComponent(window.location.hash.replace("#", ""));

/** Get has from current URL */
export const useURLHash = () => {
  const [hash, setHash] = useState(getHash());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleHashChange = () => {
      setHash(getHash());
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return isClient ? hash : null;
};
