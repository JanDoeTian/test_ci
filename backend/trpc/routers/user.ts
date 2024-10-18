import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { PrismaClient } from '@prisma/client';
import { CONFIG } from 'backend/backend-config';
const prisma = new PrismaClient();

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),


  // This is the router for the user to create a new campaign
  createCampaign: protectedProcedure
    .input(z.object({ name: z.string(), link: z.string(), description: z.string(), countries: z.string().array(), dailyBudget: z.number() }))
    .mutation(async (opts) => {
      const { input } = opts;
      const supabase = opts.ctx.supabase;
      const user = (await supabase.auth.getUser()).data.user;
  
      if (!user || !user.email || !user.id) {
        throw new Error('User not found');
      }

      const { id } = user;

      await prisma.campaign.create({
        data: {
          name: input.name,
          link: input.link,
          description: input.description,
          countries: input.countries,
          dailyBudget: input.dailyBudget,
          user: {
            connect: {
              id,
            },
          },
        },
      });
    }),
});
