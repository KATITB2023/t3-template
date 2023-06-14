import { type NextApiHandler } from "next";
import formidable from "formidable";
import { uploadStream } from "~/utils/file";

const handler: NextApiHandler<string> = (req, res) => {
  if (req.method !== "POST") {
    res.status(405);
    return;
  }

  const form = formidable({ fileWriteStreamHandler: uploadStream });
  form.parse(req, () => {
    res.status(201).json("File uploaded");
  });
};

export default handler;
