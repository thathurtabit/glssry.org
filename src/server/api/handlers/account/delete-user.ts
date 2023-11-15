import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { protectedProcedure } from "~/server/api/trpc";
import { errorMessage } from "~/server/api/utils/error-message";

export const deleteUser = protectedProcedure.mutation(async ({ ctx }) => {
  try {
    const userID = ctx.session.user.id;

    return ctx.db.user.delete({
      where: { id: userID },
    });
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      throw new TRPCError({
        code: error.code,
        message: errorMessage.deleteUser(httpCode),
        cause: error,
      });
    }

    throw new Error(errorMessage.deleteUser(500));
  }
});
