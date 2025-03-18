import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { z } from 'zod';

const Posts = lazy(() => import('@/components/Posts'));

export const PostsIndex = () => {
  return (
    <div>
      <Posts />
    </div>
  );
};

export const Route = createFileRoute('/posts/')({
  component: PostsIndex,
  validateSearch: z.object({
    page: z.number().catch(1),
  }),
});
