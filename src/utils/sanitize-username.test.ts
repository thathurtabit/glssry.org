import { describe, expect, it } from "vitest";

import { sanitizeUsername } from "./sanitize-username";

describe("sanitizeUsername", () => {
  it("should filter out special characters", () => {
    expect(sanitizeUsername("Stephen???-12")).toBe("stephen-12");
    expect(sanitizeUsername("Stephen??? 12")).toBe("stephen-12");
    expect(sanitizeUsername("Stephen???_12^")).toBe("stephen_12");
    expect(sanitizeUsername("Stephen----F")).toBe("stephen-f");
  });
});
