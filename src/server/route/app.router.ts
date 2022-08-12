import { createRouter } from '../createRouter';
import { postRouter } from './post.router';
import { userRouter } from './user.router';

//? 여러 Router를 하나의 Router로 합친다.
//? (이름 뒤에 .은 'users.register-user'식으로 key를 만들기 위해서)
export const appRouter = createRouter()
  .merge('users.', userRouter)
  .merge('posts.', postRouter);

export type AppRouter = typeof appRouter;
