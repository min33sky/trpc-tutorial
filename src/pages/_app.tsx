import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { loggerLink } from '@trpc/client/links/loggerLink';
import { httpBatchLink } from '@trpc/client/links/httpBatchLink';
import { withTRPC } from '@trpc/next';
import superjson from 'superjson';
import { AppRouter } from '@/server/route/app.router';
import { url } from '@/constants';
import { UserContextProvider } from '@/context/user.context';
import { trpc } from '@/utils/trpc';

function MyApp({ Component, pageProps }: AppProps) {
  const { data, isLoading, error } = trpc.useQuery(['users.me']);

  if (isLoading) {
    return <div>Loading User....</div>;
  }

  return (
    <UserContextProvider value={data}>
      <main>
        <Component {...pageProps} />
      </main>
    </UserContextProvider>
  );
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    //? Debug에 유용한 Link들을 추가
    const links = [
      loggerLink({
        enabled: (opts) =>
          process.env.NODE_ENV === 'development' ||
          (opts.direction === 'down' && opts.result instanceof Error),
      }),
      httpBatchLink({
        maxBatchSize: 10,
        url,
      }),
    ];

    return {
      queryClientConfig: {
        defaultOptions: {
          queries: {
            staleTime: 60,
          },
        },
      },
      headers() {
        if (ctx?.req) {
          return {
            ...ctx.req.headers,
            'x-ssr': '1',
          };
        }
        return {};
      },
      links,
      transformer: superjson,
    };
  },
  ssr: true,
})(MyApp);
