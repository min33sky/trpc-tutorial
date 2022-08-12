import { CreatePostSchema } from '@/schema/post.schema';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

function CreatePostPage() {
  const router = useRouter();
  const { handleSubmit, register } = useForm<CreatePostSchema>();
  const { mutate, error } = trpc.useMutation(['posts.create-post'], {
    onSuccess: ({ id }) => {
      router.push(`/posts/${id}`);
    },
  });

  const onSubmit: SubmitHandler<CreatePostSchema> = ({ body, title }) => {
    mutate({
      body,
      title,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && error.message}
      <h1>Create Post</h1>
      <input type="text" placeholder="Your post title" {...register('title')} />
      <br />
      <textarea placeholder="Your post title" {...register('body')} />
      <br />
      <button>Create post</button>
    </form>
  );
}

export default CreatePostPage;
