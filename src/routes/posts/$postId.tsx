import Post from '@/components/Post';
import { createFileRoute } from '@tanstack/react-router';
import { z } from 'zod';

export const PostPage = () => {
  const { postId } = Route.useParams();
  return (
    <div>
      <Post postId={postId} />
    </div>
  );
};

export const Route = createFileRoute('/posts/$postId')({
  component: PostPage,
  validateSearch: z.object({
    mysearch: z.number().catch(1),
  }),
});
