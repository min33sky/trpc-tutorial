import z from 'zod';

/**
 *## 회원 가입 스키마
 */
export const createUserSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export const createUserOutputSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

export type CreateUserInput = z.TypeOf<typeof createUserSchema>;

/**
 *## 로그인 (OTP 방식) 스키마
 */
export const requestOtpSchema = z.object({
  email: z.string().email(),
  redirect: z.string().default('/'),
});

export type RequestOtpInput = z.TypeOf<typeof requestOtpSchema>;

/**
 *## 로그인 토큰 스키마
 */
export const verifyOtpSchema = z.object({
  hash: z.string(),
});
