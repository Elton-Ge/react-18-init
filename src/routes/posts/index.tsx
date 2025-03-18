import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';
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
});
