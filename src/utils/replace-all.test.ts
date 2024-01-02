import { describe, expect, it } from "vitest";

import { replaceAll } from "./replace-all";

describe("replaceAll", () => {
  it("should replace all occurrences of a string", () => {
    expect(replaceAll("hello world", " ", "-")).toEqual("hello-world");
  });

  it("should replace all occurrences of a string", () => {
    expect(replaceAll("hello mum, I love you mum", "mum", "dad")).toEqual("hello dad, I love you dad");
  });
});
