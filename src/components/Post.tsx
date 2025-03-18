import { useQuery } from '@tanstack/react-query';
import type { Post } from './Posts';

const Post = ({ postId }: { postId: string }) => {
  const { isLoading, error, data } = useQuery<Post>({
    queryKey: ['posts', postId],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline">
          {error instanceof Error ? error.message : 'An error occurred'}
        </span>
      </div>
    );
  }

  return (
    <div className="border border-blue-400 p-2 flex flex-col gap-3 mt-2">
      <div>Post ID: {postId}</div>
      <div>Post title: {data?.title}</div>
      <div>Post body: {data?.body}</div>
    </div>
  );
};

export default Post;
