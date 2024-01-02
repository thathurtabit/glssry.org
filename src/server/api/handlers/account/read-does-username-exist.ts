import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";
import { sharedReadIsUsernameTaken } from "../shared/user/shared-read-is-username-taken";

export const readDoesUsernameExist = protectedProcedure.input(
  z.object({
    username: z.string(),
  })
).query(async ({ ctx, input }) => {
  try {
    return await sharedReadIsUsernameTaken(input.username, ctx.db);
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readDoesUsernameExist(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readDoesUsernameExist(500, error as string));
  }
});
