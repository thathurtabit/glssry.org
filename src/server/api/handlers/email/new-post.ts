import { render } from "@react-email/render";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { createTransport } from "nodemailer";

import { newPost } from "~/emails/new-post.email";
import { environment } from "~/environment.mjs";
import { newPostEmailSchema } from "~/schemas/email/new-post.schema";
import { protectedProcedure } from "~/server/api/trpc";
import { errorMessage } from "~/server/api/utils/error-message";
import { appDomain } from "~/settings/constants";

import { sharedReadUserData } from "../shared/user/shared-read-user-data";

export const newPostEmailNotification = protectedProcedure.input(
  newPostEmailSchema
).mutation(async ({ input, ctx }) => {
  const userId = ctx.session?.user.id;

  if (!userId) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMessage.readPost(401, "User not logged in"),
    });
  }

  const userData = await sharedReadUserData(userId, ctx.db);

  if (!userData) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: errorMessage.readPost(401, "Cannot find current user"),
    });
  }

  try {
    const transporter = createTransport({
      host: environment.EMAIL_SERVER_HOST,
      port: Number(environment.EMAIL_SERVER_PORT),
      secure: true,
      auth: {
        user: environment.EMAIL_SERVER_USER,
        pass: environment.EMAIL_SERVER_PASSWORD,
      },
    });
    const emailHtml = render(newPost(input));
    (async () => {
      await transporter.sendMail({
        from: `"${appDomain}" ${environment.EMAIL_FROM}`,
        to: environment.EMAIL_TO,
        subject: `New ${appDomain} Post`,
        text: input.body,
        html: emailHtml,
      });
    })().catch((error) => {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: errorMessage.newPostEmailNotification(500, error as string),
        cause: error,
      });
    });
  } catch (error) {
    if (error instanceof TRPCError) {
      const httpCode = getHTTPStatusCodeFromError(error);
      const { message, code } = error;
      throw new TRPCError({
        code,
        message: errorMessage.newPostEmailNotification(httpCode, message),
        cause: error,
      });
    }

    throw new Error(errorMessage.newPostEmailNotification(500, error as string));
  }
});
