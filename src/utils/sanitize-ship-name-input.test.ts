import { describe, expect, it } from "vitest";
import { sanitizeShipNameInput } from "./sanitize-ship-name-input";

describe("sanitizeShipNameInput", () => {
  it("should filter out special characters", () => {
    expect(sanitizeShipNameInput("Stephen???_12")).toBe("Stephen");
    expect(sanitizeShipNameInput("stephen?&? 12")).toBe("Stephen");
    expect(sanitizeShipNameInput("STEPHEN???_12^")).toBe("Stephen");
  });

  it("should replace words with correct capitalization", () => {
    expect(sanitizeShipNameInput("!stepheN")).toBe("Stephen");
    expect(sanitizeShipNameInput("stephen")).toBe("Stephen");
    expect(sanitizeShipNameInput("STEPHEN?")).toBe("Stephen");
  });

  it("should remove any filthy swears", () => {
    expect(sanitizeShipNameInput("Brian-  Jones Cunt")).toBe("Brian Jones ****");
    expect(sanitizeShipNameInput("  stephentwat ")).toBe("Stephen****");
    expect(sanitizeShipNameInput("DicK?  ")).toBe("****");
    expect(sanitizeShipNameInput("Twat")).toBe("****");
  });

  it("should tidy up strange formatting", () => {
    expect(sanitizeShipNameInput("Brian- jones")).toBe("Brian Jones");
    expect(sanitizeShipNameInput("Brian jones")).toBe("Brian Jones");
    expect(sanitizeShipNameInput("Brian-Jones")).toBe("Brian Jones");
  });

  it("should remove multiple sequential hyphens", () => {
    expect(sanitizeShipNameInput("Brian--  Jones Cunt")).toBe("Brian Jones ****");
    expect(sanitizeShipNameInput("  stephen---twat ")).toBe("Stephen ****");
    expect(sanitizeShipNameInput("--DicK?  ")).toBe("****");
  });
});
