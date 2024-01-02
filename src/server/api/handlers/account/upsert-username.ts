import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { z } from "zod";

import { protectedProcedure } from "~/server/api/trpc";

import { sanitizeUsername } from "~/utils/sanitize-username";

import { errorMessage } from "../../utils/error-message";
import { sharedReadIsUsernameTaken } from "../shared/user/shared-read-is-username-taken";

export const upsertUsername = protectedProcedure
  .input(
    z.object({
      username: z.string(),
    })
  )
  .mutation(async ({ ctx, input }) => {
    const userID = ctx.session.user.id;
    try {
      const sanitizedUsername = sanitizeUsername(input.username);
      const isUsernameTaken = await sharedReadIsUsernameTaken(sanitizedUsername, ctx.db);

      if (isUsernameTaken) {
        throw new TRPCError({ code: "FORBIDDEN", message: errorMessage.usernameIsTaken(403, "username is taken") });
      }

      return ctx.db.user.update({
        where: { id: userID },
        data: { username: sanitizedUsername, hasPersonalizedUsername: true },
      });
    } catch (error) {
      if (error instanceof TRPCError) {
        const httpCode = getHTTPStatusCodeFromError(error);
        const { message, code } = error;
        throw new TRPCError({
          code,
          message: errorMessage.upsertUsername(httpCode, message),
          cause: error,
        });
      }

      throw new Error(errorMessage.upsertUsername(500, error as string));
    }
  });
