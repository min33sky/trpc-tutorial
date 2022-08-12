import { CreateUserInput } from '@/schema/user.schema';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { trpc } from './utils/trpc';

function RegisterPage() {
  const { register, handleSubmit } = useForm<CreateUserInput>();
  const router = useRouter();

  const { mutate, error } = trpc.useMutation(['users.register-user'], {
    onSuccess: () => {
      router.push('/login');
    },
  });

  const onSubmit: SubmitHandler<CreateUserInput> = ({ email, name }) => {
    mutate({
      email,
      name,
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {error && error.message}
        <h1>Register</h1>

        <input
          {...register('email', { required: true })}
          type="email"
          placeholder="son@naver.com"
        />
        <br />
        <input
          {...register('name', { required: true })}
          type="text"
          placeholder="son heung min"
        />

        <button type="submit">Register</button>
      </form>

      <Link href={'/login'}><a>Login</a></Link>
    </>
  );
}

export default RegisterPage;
