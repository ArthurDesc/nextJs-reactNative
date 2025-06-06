import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '@/server/trpc/router';
import { createContext } from '@/server/trpc/context';

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext,
  onError:
    process.env.NODE_ENV === 'development'
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? ''}: ${error.message}`,
          );
        }
      : undefined,
}); 