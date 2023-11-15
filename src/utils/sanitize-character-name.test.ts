import { describe, expect, it } from "vitest";
import { sanitizeCharacterName } from "./sanitize-character-name";

describe("sanitizeCharacterName", () => {
  it("should filter out special characters", () => {
    expect(sanitizeCharacterName("Stephen???_12")).toBe("Stephen");
    expect(sanitizeCharacterName("stephen?&? 12")).toBe("Stephen");
    expect(sanitizeCharacterName("STEPHEN???_12^")).toBe("Stephen");
  });

  it("should replace words with correct capitalization", () => {
    expect(sanitizeCharacterName("!stepheN")).toBe("Stephen");
    expect(sanitizeCharacterName("stephen")).toBe("Stephen");
    expect(sanitizeCharacterName("STEPHEN?")).toBe("Stephen");
  });

  it("should remove any extra spaces", () => {
    expect(sanitizeCharacterName("Brian-  Jones")).toBe("Brian Jones");
    expect(sanitizeCharacterName("  stephen ")).toBe("Stephen");
    expect(sanitizeCharacterName("STEPHEN?  ")).toBe("Stephen");
  });

  it("should remove any filthy swears", () => {
    expect(sanitizeCharacterName("Brian-  Jones Cunt")).toBe("Brian Jones ****");
    expect(sanitizeCharacterName("  stephentwat ")).toBe("Stephen****");
    expect(sanitizeCharacterName("DicK?  ")).toBe("****");
  });

  it("should remove multiple sequential hyphens", () => {
    expect(sanitizeCharacterName("Brian--  Jones Cunt")).toBe("Brian Jones ****");
    expect(sanitizeCharacterName("  stephen---twat ")).toBe("Stephen ****");
    expect(sanitizeCharacterName("--DicK?  ")).toBe("****");
  });
});
