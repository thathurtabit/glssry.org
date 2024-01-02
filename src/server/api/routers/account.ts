import { deleteUser } from "~/server/api/handlers/account/delete-user";
import { readDoesUsernameExist } from "~/server/api/handlers/account/read-does-username-exist";
import { readRandomUsername } from "~/server/api/handlers/account/read-random-username";
import { readUser } from "~/server/api/handlers/account/read-user";
import { upsertUsername } from "~/server/api/handlers/account/upsert-username";
import { verifyRecaptcha } from "~/server/api/handlers/account/verify-recaptcha";

import { createTRPCRouter } from "../trpc";

export const accountRouter = createTRPCRouter({
  deleteUser,
  readUser,
  readDoesUsernameExist,
  readRandomUsername,
  upsertUsername,
  verifyRecaptcha,
});
