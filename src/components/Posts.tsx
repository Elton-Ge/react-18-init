import { useQuery } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

export interface PostType {
  id: string;
  title: string;
  body: string;
  userId: number;
}

const Posts = () => {
  const { isLoading, error, data } = useQuery<PostType[]>({
    queryKey: ['posts'],
    queryFn: () => fetch('https://jsonplaceholder.typicode.com/posts').then((res) => res.json()),
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
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Posts from JSONPlaceholder</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.slice(0, 6).map((post) => (
          <Link
            key={post.id}
            className="border rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            to="/posts/$postId"
            params={{ postId: post.id }}
          >
            <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
            <p className="text-gray-600">{post.body.substring(0, 100)}...</p>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Posts;
