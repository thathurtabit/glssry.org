import { getRandomUsername } from "~/utils/get-username-generator";
import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { protectedProcedure } from "~/server/api/trpc";
import { errorMessage } from "~/server/api/utils/error-message";
import { sharedReadIsUsernameTaken } from "../shared/user/shared-read-is-username-taken";

export const deleteUser = protectedProcedure.mutation(async ({ ctx }) => {
  try {
    const userID = ctx.session.user.id;

    let isUsernameTaken = true;
    let randomUsername;

    do {
      randomUsername = getRandomUsername({});
      // The below might actually be fine
      // eslint-disable-next-line no-await-in-loop
      isUsernameTaken = await sharedReadIsUsernameTaken(randomUsername, ctx.db);
    } while (isUsernameTaken);

    return ctx.db.user.update({
      where: { id: userID },
      data: {
        email: null,
        emailVerified: null,
        name: null,
        hasPersonalizedUsername: false,
        image: null,
        username: randomUsername,
        role: UserRole.CONTRIBUTOR,
      },
    });
  } catch (error) {
    if (error instanceof TRPCError) {
      const { message } = error;
      const httpCode = getHTTPStatusCodeFromError(error);
      throw new TRPCError({
        code: error.code,
        message: errorMessage.deleteUser(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.deleteUser(500, error as string));
  }
});
