import { CreateUserInput } from '@/schema/user.schema';
import { trpc } from '@/utils/trpc';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

function VerifyToken({ hash }: { hash: string }) {
  const router = useRouter();
  const { data, isLoading } = trpc.useQuery([
    'users.verify-otp',
    {
      hash,
    },
  ]);

  if (isLoading) {
    return <div>Verifying...</div>;
  }

  //? 로그인이 성공했을 때 Root 페이지로 리다이렉트 시킨다.
  router.push(data?.redirect.includes('login') ? '/' : data?.redirect || '/');

  return <div>Redirecting</div>;
}

function LoginForm() {
  const { handleSubmit, register } = useForm<CreateUserInput>();
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(['users.request-otp'], {
    onSuccess: () => {
      setSuccess(true);
    },
  });

  const onSubmit: SubmitHandler<CreateUserInput> = ({ email, name }) => {
    console.log('router.asPath: ', router.asPath);
    mutate({
      email,
      redirect: router.asPath, //* 현재 페이지 주소인 '/login'
    });
  };

  const hash = router.asPath.split('#token=')[1];

  if (hash) {
    return <VerifyToken hash={hash} />;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}

        {success && <p>Check your email</p>}
        <h1>Login</h1>

        <input
          type="email"
          placeholder="leo@example.com"
          {...register('email')}
        />
        <button type="submit">Login</button>
      </form>

      <Link href="/register">
        <a>Register</a>
      </Link>
    </>
  );
}

export default LoginForm;
