import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";

import { protectedProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";
import { sharedReadUserData } from "../shared/user/shared-read-user-data";

export const readUser = protectedProcedure.query(async ({ ctx }) => {
  try {
    const userId = ctx.session.user.id;
    return await sharedReadUserData(userId, ctx.db);
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.readUserData(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.readUserData(500, error as string));
  }
});
