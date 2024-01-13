import { render } from "@react-email/render";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

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
    (async () => {
      const mailerSend = new MailerSend({
        apiKey: process.env.MAILERSEND_API_KEY ?? "",
      });

      const emailHtml = render(newPost(input));
      const sentFrom = new Sender(environment.EMAIL_FROM, appDomain);
      const recipients = [
        new Recipient(environment.EMAIL_TO, `${appDomain} New Post`),
      ];

      const emailParameters = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(`New Post - ${input.title}}`)
        .setHtml(emailHtml)
        .setText(input.body);

      await mailerSend.email.send(emailParameters);
    })().catch((error: { body: { message: string } }) => {
      throw new Error(error.body.message ?? "Error sending Mailersend email");
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
