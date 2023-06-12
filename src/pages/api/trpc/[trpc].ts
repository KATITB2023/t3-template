import { createNextApiHandler } from "@trpc/server/adapters/next";
import { env } from "~/env.mjs";
import { appRouter } from "~/server/api/root";
import { createTRPCContext } from "~/server/api/trpc";

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          );
        }
      : undefined,
  responseMeta() {
    return {
      // cache request for a period of time + revalidate once every second
      headers: {
        "Cache-Control": `s-maxage=1, stale-while-revalidate=${env.STALE_WHILE_REVALIDATE}`,
      },
    };
  },
});
