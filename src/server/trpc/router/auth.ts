import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
  createUser: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const userExists = await ctx.prisma.user.findFirst({
        where: {
          email: input.email,
        },
        select: {
          id: true,
        },
      });

      if (userExists) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: `A user with email: ${input.email} already exists`,
        });
      }

      const result = await ctx.prisma.user.create({
        data: input,
        select: {
          id: true,
          email: true,
        },
      });

      return result;
    }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "You are logged in and can see this secret message!";
  }),
});
