import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { storage } from "~/server/storage";
import { env } from "~/env.mjs";

export const storageRouter = createTRPCRouter({
  generateURLForDownload: publicProcedure
    .input(z.object({ filename: z.string() }))
    .mutation(async ({ input }) => {
      const bucketname = env.BUCKET_NAME;
      const bucket = storage.bucket(bucketname);
      const ref = bucket.file(input.filename);

      const [url] = await ref.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + env.URL_EXPIRATION_TIME,
      });

      return url;
    }),

  generateURLForUpload: protectedProcedure
    .input(
      z.object({ filename: z.string(), contentType: z.string().optional() })
    )
    .mutation(async ({ input }) => {
      const bucketname = env.BUCKET_NAME;
      const bucket = storage.bucket(bucketname);
      const ref = bucket.file(input.filename);

      const [url] = await ref.getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + env.URL_EXPIRATION_TIME,
        contentType: input.contentType,
      });

      return url;
    }),
});
