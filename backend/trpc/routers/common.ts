import { z } from 'zod';
import { router, publicProcedure, protectedProcedure } from '../trpc';
import { PrismaClient } from '@prisma/client';
import {CONFIG} from '../../backend-config';
const prisma = new PrismaClient();

export const commonRouter = router({

});
