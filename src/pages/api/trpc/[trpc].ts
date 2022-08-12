import { createContext } from '@/server/createContext';
import { appRouter } from '@/server/route/app.router';
import * as trpc from '@trpc/server/adapters/next'; //? nextjs adapter

export default trpc.createNextApiHandler({
  router: appRouter,
  createContext,
  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      console.error('Something went wrong', error);
    } else {
      console.error(error);
    }
  },
});
