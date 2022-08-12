import { AppRouter } from '@/server/route/app.router';
import { createReactQueryHooks } from '@trpc/react';

/**
 *? Client에서 사용할 수 있는 trpc의 Hook을 제공한다
 */
export const trpc = createReactQueryHooks<AppRouter>();
