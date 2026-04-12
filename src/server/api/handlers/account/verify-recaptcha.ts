import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { z } from "zod";

import { environment } from "~/environment.mjs";
import { publicProcedure } from "~/server/api/trpc";

import { errorMessage } from "../../utils/error-message";

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
        body: `secret=${environment.NEXT_PUBLIC_RECAPTCHA_SECRET_KEY}&response=${token}`,
      });

      if (!response.ok) {
        return {
          statusCode: response.status,
          success: false,
          message: "Something went wrong while verifying the captcha code",
          reasons: `verify-endpoint-status-${response.status}`,
        };
      }

      // Using 'as' is dodgy, but it's the only way to get the response body
      const data = await response.json() as TRecaptchaResponse;

      // If the captcha code is invalid, return an error
      if (!data.success) {
        return {
          statusCode: 200,
          success: false,
          message: "Captcha verification failed",
          reasons: data["error-codes"]?.join(", ") ?? "Unknown error",
        };
      }

      if (data.success) {
        return {
          statusCode: 200,
          success: data.success,
          message: "Seems like you are not a robot, thanks for verifying!",
          reasons: data["error-codes"]?.join(", "),
        };
      }

      return {
        statusCode: 500,
        success: false,
        message: "Captcha verification failed",
        reasons: data["error-codes"]?.join(", ") ?? "Unknown error",
      };
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      if (error instanceof TRPCError) {
        const httpCode = getHTTPStatusCodeFromError(error);
        return {
          statusCode: httpCode,
          success: false,
          message: errorMessage.verifyCaptcha(httpCode, message),
          reasons: message,
        };
      }

      return {
        statusCode: 500,
        success: false,
        message,
        reasons: message,
      };
    }
  });
