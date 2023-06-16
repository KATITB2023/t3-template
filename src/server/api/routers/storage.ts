import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
import sanitize from "sanitize-filename";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { bucket } from "~/server/bucket";
import { FolderEnum } from "~/utils/file";
import { env } from "~/env.mjs";

export const storageRouter = createTRPCRouter({
  getMetadata: publicProcedure.query(async () => {
    return await bucket.getMetadata();
  }),

  generateURLForDownload: publicProcedure
    .input(
      z.object({
        folder: z.union([
          z.literal(FolderEnum.PROFILE),
          z.literal(FolderEnum.ASSIGNMENT),
        ]),
        filename: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await bucket.setCorsConfiguration([
        {
          maxAgeSeconds: env.BUCKET_CORS_EXPIRATION_TIME,
          method: ["GET", "PUT"],
          origin: ["*"],
          responseHeader: ["Content-Type"],
        },
      ]);

      const ref = bucket.file(`${input.folder}/${input.filename}`);

      const [url] = await ref.getSignedUrl({
        version: "v4",
        action: "read",
        expires: Date.now() + env.URL_EXPIRATION_TIME,
      });

      return {
        url,
      };
    }),

  generateURLForUpload: protectedProcedure
    .input(
      z.object({
        folder: z.union([
          z.literal(FolderEnum.PROFILE),
          z.literal(FolderEnum.ASSIGNMENT),
        ]),
        filename: z.string(),
        contentType: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const fileUUID = uuidv4();
      const sanitizedFileName = sanitize(input.filename);
      const sanitizedFilename = `${fileUUID}-${sanitizedFileName}`;

      await bucket.setCorsConfiguration([
        {
          maxAgeSeconds: env.BUCKET_CORS_EXPIRATION_TIME,
          method: ["GET", "PUT"],
          origin: ["*"],
          responseHeader: ["Content-Type"],
        },
      ]);

      const ref = bucket.file(`${input.folder}/${sanitizedFilename}`);

      const [url] = await ref.getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + env.URL_EXPIRATION_TIME,
        contentType: input.contentType,
      });

      return {
        url,
        sanitizedFilename,
      };
    }),
});
