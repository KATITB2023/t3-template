import { Prisma } from "@prisma/client";
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
      return await ctx.prisma.$transaction(
        async (tx) => {
          const example = await tx.example.findUnique({
            where: { id: input.id },
          });
          return example;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
        }
      );
    }),

  getAllExample: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.$transaction(
      async (tx) => {
        const examples = await tx.example.findMany();
        return examples;
      },
      {
        isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
      }
    );
  }),

  createExample: publicProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction(
        async (tx) => {
          const example = await tx.example.create({
            data: { message: input.message },
          });
          return example;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
        }
      );
    }),

  updateExample: publicProcedure
    .input(z.object({ id: z.string(), message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction(
        async (tx) => {
          const example = await tx.example.update({
            where: { id: input.id },
            data: { message: input.message },
          });
          return example;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
        }
      );
    }),

  deleteExample: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.$transaction(
        async (tx) => {
          const example = await tx.example.delete({
            where: { id: input.id },
          });
          return example;
        },
        {
          isolationLevel: Prisma.TransactionIsolationLevel.ReadUncommitted,
        }
      );
    }),
});
