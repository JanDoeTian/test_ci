import { appRouter } from 'backend/trpc';
import { createClient } from 'backend/supabase/serverClient';
import { fetchRequestHandler } from '@trpc/server/adapters/fetch';

const handler = async (req: Request) => {
  const response = await fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => ({
      supabase: createClient(),
    }),
  });

  return response;
};
export { handler as GET, handler as POST };
