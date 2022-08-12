import { AppRouter } from '@/server/route/app.router';
import { inferProcedureOutput } from '@trpc/server';
import React, { createContext, useContext } from 'react';

//? AppRouter에 정의된 쿼리의 키 타입
type TQuery = keyof AppRouter['_def']['queries'];

//? 쿼리 결과를 추론하는 타입
type InferQueryOutput<TRouteKey extends TQuery> = inferProcedureOutput<
  AppRouter['_def']['queries'][TRouteKey]
>;

const UserContext = createContext<InferQueryOutput<'users.me'>>(null);

function UserContextProvider({
  children,
  value,
}: {
  children: React.ReactNode;
  value: InferQueryOutput<'users.me'> | undefined;
}) {
  return (
    <UserContext.Provider value={value || null}>
      {children}
    </UserContext.Provider>
  );
}

/**
 *** 현재 로그인한 유저 정보를 가져오는 훅
 */
const useUserContext = () => useContext(UserContext);

export { useUserContext, UserContextProvider };
