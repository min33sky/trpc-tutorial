import { trpc } from '@/utils/trpc';
import Link from 'next/link';
import React from 'react';

function PostListingPage() {
  const { data, isLoading } = trpc.useQuery(['posts.posts']);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {data?.map((post) => (
        <article key={post.id}>
          <p>{post.title}</p>
          <Link href={`/posts/${post.id}`}>Read Post...</Link>
        </article>
      ))}
      <Link href={'/posts/newPost'}>
        <a>Create Post</a>
      </Link>
    </div>
  );
}

export default PostListingPage;
