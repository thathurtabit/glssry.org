import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { protectedProcedure } from "~/server/api/trpc";
import { getRandomUsername } from "~/utils/get-username-generator";

import { errorMessage } from "../../utils/error-message";
import { sharedReadIsUsernameTaken } from "../shared/user/shared-read-is-username-taken";

export const readRandomUsername = protectedProcedure.query(async ({ ctx }) => {
  try {
    let isUsernameTaken = true;
    let username;

    do {
      username = getRandomUsername({});
      // The below might actually be fine
       
      isUsernameTaken = await sharedReadIsUsernameTaken(username, ctx.db);
    } while (isUsernameTaken);

    return username;
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readRandomUsername(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readRandomUsername(500, error as string));
  }
});
