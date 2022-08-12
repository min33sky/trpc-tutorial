import { verifyJwt } from '@/utils/jwt';
import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../utils/prisma';

interface CtxUser {
  id: string;
  email: string;
  name: string;
  iat: string;
  exp: number;
}

/**
 * ## 요청한 유저 정보를 쿠키에서 가져오기
 * @param req
 * @returns
 */
function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token;

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token);
      return verified;
    } catch (e) {
      return null;
    }
  }

  return null;
}

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest;
  res: NextApiResponse;
}) {
  const user = getUserFromRequest(req);

  /**
   *? 매번 import하는 대신  ctx에서 Prisma instance를 꺼내올 수 있다.
   *? 요청한 유저의 정보도 ctx에 넣어서 활용할 수 있다.
   */
  return { req, res, prisma, user };
}

export type Context = ReturnType<typeof createContext>;
