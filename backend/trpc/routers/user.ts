import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { PrismaClient } from '@prisma/client';
import { CONFIG } from 'backend/backend-config';
const prisma = new PrismaClient();

export const userRouter = router({
  getUsers: publicProcedure.query(async () => {
    return await prisma.user.findMany();
  }),

  // addUser: protectedProcedure
  //   .input(z.object({ name: z.string(), race: z.string() }))
  //   .mutation(async (opts) => {
  //     const { input } = opts;
  //     await prisma.user.create({
  //       data: {
  //         name: input.name,
  //         race: input.race,
  //       },
  //     });
  //   }),


  deleteFile: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async (opts) => {
      const { id } = opts.input;
      const supabase = opts.ctx.supabase;
      const user = (await supabase.auth.getUser()).data.user;

      // Find the file to delete
      const fileToDelete = await prisma.userUpload.findUnique({
        where: {
          id,
        },
      });

      if (!fileToDelete) {
        throw new Error('File not found');
      }

      // Delete the file from Supabase storage
      const { error } = await supabase.storage
        .from('app')
        .remove([`${user?.id}/${fileToDelete.fileName}`]);

      if (error) {
        throw new Error(error.message);
      }
      await prisma.userUpload.delete({
        where: {
          id,
        },
      });
    }),

  // Add a file to the user's storage
  addFile: protectedProcedure
    .input(z.object({ name: z.string(), file: z.string() }))
    .mutation(async (opts) => {
      const supabase = opts.ctx.supabase;
      const user = (await supabase.auth.getUser()).data.user;
      const { name, file } = opts.input;
      const buffer = Buffer.from(file, 'base64');

      const userFilesCount = await prisma.userUpload.count({
        where: {
          userId: user?.id,
        },
      });

      if (userFilesCount >= CONFIG.upload.maxNumFiles) {
        throw new Error(`You can only upload up to ${CONFIG.upload.maxNumFiles} files.`);
      }
      
      const { data, error } = await supabase.storage
        .from('app')
        .upload(`${user?.id}/${name}`, buffer);


        if (data) {
          // Create a new user upload record in the database
          await prisma.userUpload.create({
            data: {
              fileId: data.id,
              fileUrl: data.path,
              fileName: name,
              user: {
                connect: {
                  id: user?.id,
                },
              },
            },
          });
        }

      if (error) {
        throw new Error(error.message);
      }

      return;
    }),

  getFiles: protectedProcedure.query(async (opts) => {
    const supabase = opts.ctx.supabase;
    const user = (await supabase.auth.getUser()).data.user;

    const userFiles = await prisma.userUpload.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: {
        updatedAt: 'desc',
      },
    });

    const parsedData = userFiles.map(file => ({
      ...file,
      updatedAt: file.updatedAt.toISOString().split('T')[0], // Extract only the date part
    }));

    return parsedData;
  }),

  getUserApplications: protectedProcedure
    .input(z.object({
      page: z.number().min(0),
      pageSize: z.number().min(1).default(10),
    }))
    .query(async (opts) => {
      const { page, pageSize } = opts.input;
      const supabase = opts.ctx.supabase;
      const user = (await supabase.auth.getUser()).data.user;

      const userApplications = await prisma.userApplication.findMany({
        where: {
          userId: user?.id,
        },
        skip: page * pageSize,
        take: pageSize,
      });

      const parsedApplications = userApplications.map(application => ({
        ...application,
        applicationDate: application.applicationDate.toISOString().split('T')[0], // Extract only the date part
      }));

      return parsedApplications;
    }),
});
