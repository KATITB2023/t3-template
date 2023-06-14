import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "You can now see this secret message!";
  }),

  getOneExample: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.example.findUnique({
        where: { id: input.id },
      });
    }),

  getAllExample: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.example.findMany();
  }),

  createExample: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.example.create({
        data: { message: input.message },
      });
    }),

  updateExample: publicProcedure
    .input(z.object({ id: z.string(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.example.update({
        where: { id: input.id },
        data: { message: input.message },
      });
    }),

  deleteExample: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.example.delete({
        where: { id: input.id },
      });
    }),
});
