import Post from '@/components/Post';
import { createFileRoute } from '@tanstack/react-router';

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
});
