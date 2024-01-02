import { z } from "zod";

import { sanitizeUsername } from "./../../utils/sanitize-username";

export const usernameSchema = z.object({
  username: z.string().min(5).max(20).transform(sanitizeUsername),
});

export type TUsernameSchema = z.infer<typeof usernameSchema>;
