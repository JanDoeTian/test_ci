import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const commonRouter = router({
  upload: protectedProcedure
    .input(z.object({ name: z.string(), file: z.any() }))
    .mutation(async (opts) => {
      const supabase = opts.ctx.supabase;
      const user = (await supabase.auth.getUser()).data.user;
      const { name, file } = opts.input;

      const { data, error } = await supabase.storage
        .from('app')
        .upload(`${user?.id}/${name}`, file);

      if (error) {
        throw new Error(error.message);
      }

      return data;
    }),
});
