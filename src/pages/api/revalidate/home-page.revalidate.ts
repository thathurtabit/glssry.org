import type { NextApiRequest, NextApiResponse } from "next";

import { environment } from "~/environment.mjs";

const { CRON_SECRET } = environment;

export default async function revalidateHomePage(
  request: NextApiRequest,
  response: NextApiResponse
) {
  // Authorize the request
  // Check for secret to confirm this is a valid request
  if (request.query.secret !== CRON_SECRET) {
    return response.status(401).json(
      "Unauthorized: You don't have permission to access this resource, ya cheeky thing!"
    );
  }

  try {
    await response.revalidate("/");
    return response.json("Home page revalidation successful");
  } catch {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return response.status(500).send("Error revalidating");
  }
}
