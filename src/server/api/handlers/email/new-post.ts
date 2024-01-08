import { render } from "@react-email/render";
import type { inferAsyncReturnType } from "@trpc/server";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { createTransport } from "nodemailer";

import { environment } from "~/environment.mjs";
import { protectedProcedure } from "~/server/api/trpc";

export const deleteUser = protectedProcedure.query(async ({ ctx }) => {
  const transporter = createTransport({
    host: env.EMAIL_SERVER_HOST,
    port: Number(environment.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
      user: env.EMAIL_SERVER_USER,
      pass: env.EMAIL_SERVER_PASSWORD,
    },
  });

  try {
    (async () => {
      // The server-side call
      const { usersWithStopperData } = await caller.public.readPreviousWeekTopStoppersList();

      type TUsersWithStopperData = inferAsyncReturnType<typeof caller.public.readPreviousWeekTopStoppersList>;

      const { topStoppersBySuccessRatio } = getSortedLeaderboardData<TUsersWithStopperData["usersWithStopperData"]>(usersWithStopperData);

      if (!topStoppersBySuccessRatio?.length) {
        res.status(200).json("No leaderboard data found");
        return;
      }

      // List of users in Promise array
      const usersPromiseArray = topStoppersBySuccessRatio?.map(({ firstName, lastName, email }, index) => new Promise<string>((resolve, reject) => {
        const resultPosition = index + 1;
        if (!email) {
          reject(new Error("No email found"));
        }

        if (!firstName) {
          reject(new Error("No firstName found"));
        }

        if (!lastName) {
          reject(new Error("No lastName found"));
        }

        if (email && firstName && lastName) {
          const emailHtml = render(leaderboardResult({
            firstName,
            position: index + 1,
          }));
          (async () => {
            const emailResult = await transporter.sendMail({
              from: `"Stop at Nothing" ${env.EMAIL_FROM}`,
              to: email,
              subject: "Last Week's Leaderboard Result",
              text: `Congrats! You achieved the #${resultPosition} position in the 'Success Ratio' category in last week's Stop at Nothing Leaderboard. The leaderboard has now been reset for a new week of competitive stopping. Thanks for taking part!`,
              html: emailHtml,
            });
            resolve(emailResult.response);
          })().catch((error) => {
            reject(error);
          });
        } else {
          reject(new Error("No email, firstName or lastName found"));
        }
      }));

      // Send emails to top stoppers (by success ratio)
      const results = await Promise.allSettled(usersPromiseArray);

      const fulfilledResultsLength = results.filter((result) => result.status === "fulfilled").length;
      const rejectedResultsLength = results.filter((result) => result.status === "rejected").length;

      res.status(200).json(`Leaderboard emails fulfilled: ${fulfilledResultsLength}, rejected: ${rejectedResultsLength}, total: ${results.length}`);
    })().catch((error) => {
      res.status(500).json(`Error while accessing users data and sending leaderboard emails: ${error}`);
    });
  } catch (error) {
    // If this a tRPC error, we can extract additional information.
    if (error instanceof TRPCError) {
      // We can get the specific HTTP status code coming from tRPC (e.g. 404 for `NOT_FOUND`).
      const httpStatusCode = getHTTPStatusCodeFromError(error);

      res.status(httpStatusCode).json("Error while accessing users data and sending leaderboard emails");
    }

    // This is not a tRPC error, so we don't have specific information.
    res.status(500).json(`Error while accessing users data and sending leaderboard emails`);
  }
});
