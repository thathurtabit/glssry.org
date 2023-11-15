import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { z } from "zod";
import { protectedProcedure } from "~/server/api/trpc";
import { sharedReadIsUsernameTaken } from "../shared/user/shared-read-is-username-taken";
import { errorMessage } from "../../utils/error-message";

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
      throw new TRPCError({
        code: error.code,
        message: errorMessage.readDoesUsernameExist(httpCode),
        cause: error,
      });
    }

    throw new Error(`readDoesUsernameExist`);
  }
});
