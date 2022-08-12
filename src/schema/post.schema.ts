import z from 'zod';

export const createPostSchema = z.object({
  title: z.string().max(256, 'Max title length is 256'),
  body: z.string().min(10, 'body is more than 10'),
});

export type CreatePostSchema = z.TypeOf<typeof createPostSchema>;

export const singlePostSchema = z.object({
  postId: z.string().uuid(),
});
