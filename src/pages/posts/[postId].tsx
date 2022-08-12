import Error from 'next/error';
import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';
import React from 'react';
import Link from 'next/link';

function SinglePostPage() {
  const router = useRouter();

  const postId = router.query.postId as string;

  const { data, isLoading } = trpc.useQuery(['posts.single-post', { postId }]);

  if (isLoading) {
    return <p>Loading posts.....</p>;
  }

  if (!data) {
    return <Error statusCode={404} />;
  }

  return (
    <div>
      <h1>{data?.title}</h1>
      <p>{data?.body}</p>
      <Link href="/posts">
        <a>게시물 목록</a>
      </Link>
    </div>
  );
}

export default SinglePostPage;
