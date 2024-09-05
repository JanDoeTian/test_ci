import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),

  addUser: protectedProcedure
    .input(z.object({ name: z.string(), race: z.string() }))
    .mutation(async (opts) => {
      const { input } = opts;
      await prisma.user.create({
        data: {
          name: input.name,
          race: input.race,
        },
      });
    }),
});
