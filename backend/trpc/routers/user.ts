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

  addFile: protectedProcedure
    .input(z.object({ name: z.string(), file: z.string() }))
    .mutation(async (opts) => {
      const supabase = opts.ctx.supabase;
      const user = (await supabase.auth.getUser()).data.user;
      const { name, file } = opts.input;
      const buffer = Buffer.from(file, 'base64');
      const { data, error } = await supabase.storage
        .from('app')
        .upload(`${user?.id}/${name}`, buffer);

      if (error) {
        throw new Error(error.message);
      }

      return data;
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
