import { createNextApiHandler } from "@trpc/server/adapters/next";

import { environment } from "~/environment.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// Export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    environment.NODE_ENV === "development"
      ? ({ path, error }) => {
         
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
});
