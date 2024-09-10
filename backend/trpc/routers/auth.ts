import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const authRouter = router({
    // postVerify happens after the user has verified their email, this will populate user's information into the database
  postVerify: protectedProcedure
    .mutation(async (opts) => {
    const supabase = opts.ctx.supabase;
    const user = (await supabase.auth.getUser()).data.user;

    if (!user || !user.email || !user.id) {
      throw new Error('User not found');
    }

    const { id, email } = user;

    await prisma.user.create({
      data: {
        id,
        email,
      },
    });

    return { id, email };
    }),

  getFiles: protectedProcedure.query(async (opts) => {
    const supabase = opts.ctx.supabase;
    const user = (await supabase.auth.getUser()).data.user;

    const { data, error } = await supabase.storage
      .from('app')
      .list(user?.id);

    if (error) {
      throw new Error(error.message);
    }

    const parsedData = data?.map(file => ({
      ...file,
      updated_at: file.updated_at.split('T')[0], // Extract only the date part
    }));

    return parsedData;
  }),
});
