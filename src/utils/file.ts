import { Storage } from "@google-cloud/storage";
import { env } from "~/env.mjs";

export enum FolderEnum {
  PROFILE = "profile",
  ASSIGNMENT = "assignment",
}

export const uploadFile = async (folder: FolderEnum, file: File) => {
  const storage = new Storage();

  const bucketName = env.BUCKET_NAME;
  const bucket = storage.bucket(bucketName);
  const fileDestination = `${folder}/${file.name}`;

  // Create a new blob in the bucket and upload the file data.
  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  // Upload the file to the bucket
  const storageFile = bucket.file(fileDestination);
  await storageFile.save(fileBuffer);

  // Get the URL of the uploaded file
  const fileUrl = `https://storage.googleapis.com/${bucketName}/${fileDestination}`;

  return fileUrl;
};
