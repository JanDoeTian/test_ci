import { router } from './trpc';
import { userRouter } from './routers/user';
import { commonRouter } from './routers/common';
export const appRouter = router({
  user: userRouter,
  common: commonRouter,
});

export type AppRouter = typeof appRouter;
