import { type Options } from "formidable";
import type VolatileFile from "formidable/VolatileFile";
import { PassThrough } from "stream";
import { env } from "~/env.mjs";
import { storage } from "~/server/storage";

// This is a helper function to create write stream to Google Cloud Storage
const createWriteStream = (filename: string, contentType?: string) => {
  const bucketName = env.BUCKET_NAME;
  const bucket = storage.bucket(bucketName);
  const ref = bucket.file(filename);

  const stream = ref.createWriteStream({
    contentType,
    gzip: true,
    resumable: true,
    validation: true,
  });

  return stream;
};

export const uploadStream: Options["fileWriteStreamHandler"] = (
  file?: VolatileFile
) => {
  const pass = new PassThrough();

  if (!file) return pass;

  const fileJSON = file?.toJSON();
  const stream = createWriteStream(
    fileJSON.originalFilename ?? fileJSON.newFilename,
    fileJSON.mimetype ?? undefined
  );
  pass.pipe(stream);

  return pass;
};
