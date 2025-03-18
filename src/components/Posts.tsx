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
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
          Posts from JSONPlaceholder
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse"
            >
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-lg shadow-md"
          role="alert"
        >
          <div className="flex items-center">
            <svg
              className="h-6 w-6 text-red-500 mr-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div>
              <p className="font-bold">Error</p>
              <p>{error instanceof Error ? error.message : 'An error occurred'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200">
        Posts from JSONPlaceholder
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.slice(0, 6).map((post) => (
          <Link
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
            to="/posts/$postId"
            params={{ postId: post.id }}
          >
            <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-200 line-clamp-2">
              {post.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 line-clamp-3">{post.body}</p>
            <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-medium">
              Read more
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Posts;
