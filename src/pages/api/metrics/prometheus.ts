import { type NextApiHandler } from "next";
import { prisma } from "~/server/db";

const handler: NextApiHandler<string> = async (_, res) => {
  const metrics = await prisma.$metrics.prometheus();

  res.status(200).send(metrics);
};

export default handler;
