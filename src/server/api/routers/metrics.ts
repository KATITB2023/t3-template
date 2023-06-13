import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const metricsRouter = createTRPCRouter({
  getJSON: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.$metrics.json();
  }),
  getPrometheus: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.$metrics.prometheus();
  }),
});
