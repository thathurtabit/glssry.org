import { upsertUsername } from "~/server/api/handlers/account/upsert-username";
import { readRandomUsername } from "~/server/api/handlers/account/read-random-username";
import { readDoesUsernameExist } from "~/server/api/handlers/account/read-does-username-exist";
import { readUser } from "~/server/api/handlers/account/read-user";
import { deleteUser } from "~/server/api/handlers/account/delete-user";
import { createTRPCRouter } from "../trpc";

export const accountRouter = createTRPCRouter({
  deleteUser,
  readUser,
  readDoesUsernameExist,
  readRandomUsername,
  upsertUsername,
});
