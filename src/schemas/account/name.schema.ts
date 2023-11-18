import { sanitizeUsername } from "./../../utils/sanitize-username";
import { z } from "zod";

export const nameSchema = z.object({
  firstName: z.string().min(2).max(20).transform(sanitizeUsername),
  lastName: z.string().min(1).max(20).transform(sanitizeUsername),
});

export type TNameSchema = z.infer<typeof nameSchema>;
