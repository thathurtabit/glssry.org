import { publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { z } from "zod";
import { errorMessages } from "../shared/user/error-messages";
import { env } from "~/env.mjs";

type TRecaptchaResponse = {
  "success": boolean
  "challenge_ts": string // Timestamp of the challenge load (ISO format yyyy-MM-dd'T'HH:mm:ssZZ)
  "hostname": string // The hostname of the site where the reCAPTCHA was solved
  "error-codes": string[] // Optional
}

export const verifyRecaptcha = publicProcedure
  .input(
    z.object({
      token: z.string().min(1),
    })
  )
  .mutation(async ({ input }) => {
    const { token } = input;

    try {
      const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=${env.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`,
      });

      if (!response.ok) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Something went wrong while verifying the captcha code",
        });
      }

      // Using 'as' is dodgy, but it's the only way to get the response body
      const data = await response.json() as TRecaptchaResponse;

      // If the captcha code is invalid, return an error
      if (!data.success) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: data["error-codes"]?.join(", "),
        });
      }

      if (data.success) {
        return {
          statusCode: 200,
          success: data.success,
          message: "Seems like you are not a robot, thanks for verifying!",
          reasons: data["error-codes"]?.join(", "),
        };
      }

      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: data["error-codes"]?.join(", "),
      });
    } catch (error) {
      if (error instanceof TRPCError) {
        const httpCode = getHTTPStatusCodeFromError(error);
        throw new TRPCError({
          code: error.code,
          message: errorMessages.verifyCaptcha(httpCode, error as unknown as string),
          cause: error,
        });
      }

      return {
        statusCode: 500,
        success: false,
        message: error,
      };
    }
  });
