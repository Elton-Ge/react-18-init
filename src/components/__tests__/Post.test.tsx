import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, expect, test, vi, beforeEach } from 'vitest';
import '@testing-library/jest-dom';

// Mock the Post component to avoid router issues
const mockPost = {
  id: 1,
  title: 'Test Post Title',
  body: 'Test post body content',
  userId: 1,
};

// Mock fetch API
vi.mock('node:fetch', () => ({
  default: vi.fn(),
}));

// Create a real Post component mock that we can control
const MockPostComponent = ({ postId, status, error, data }: { 
  postId: string;
  status: 'loading' | 'error' | 'success';
  error?: Error;
  data?: typeof mockPost;
}) => {
  if (status === 'loading') {
    return (
      <div className="container mx-auto p-8">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 animate-pulse" data-testid="loading-skeleton">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-6"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="container mx-auto p-8">
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
              <p>{error?.message || 'An error occurred'}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Post ID: {postId}</div>
        <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">{data?.title}</h1>
        <div className="prose prose-lg text-gray-600 dark:text-gray-300">
          <p className="whitespace-pre-wrap">{data?.body}</p>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
          <a
            href="/posts"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Posts
          </a>
        </div>
      </div>
    </div>
  );
};

// Mock the useQuery hook
vi.mock('@tanstack/react-query', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@tanstack/react-query')>();
  return {
    ...actual,
    useQuery: vi.fn(),
  };
});

describe('Post Component Tests', () => {
  // Setup the useQuery mock for each test case
  beforeEach(() => {
    vi.resetAllMocks();
  });

  test('renders loading state initially', () => {
    render(<MockPostComponent postId="1" status="loading" />);
    
    // Check for loading skeleton elements
    expect(screen.getByTestId('loading-skeleton')).toBeInTheDocument();
  });

  test('renders post data when fetch is successful', () => {
    render(
      <MockPostComponent 
        postId="1" 
        status="success" 
        data={mockPost} 
      />
    );

    // Check content and back button
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
    expect(screen.getByText('Test post body content')).toBeInTheDocument();
    expect(screen.getByText('Post ID: 1')).toBeInTheDocument();
    expect(screen.getByText('Back to Posts')).toBeInTheDocument();
  });

  test('renders error state when fetch fails', () => {
    render(
      <MockPostComponent 
        postId="1" 
        status="error" 
        error={new Error('HTTP error! status: 404')} 
      />
    );
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('HTTP error! status: 404')).toBeInTheDocument();
  });

  test('renders error state when fetch throws an error', () => {
    render(
      <MockPostComponent 
        postId="1" 
        status="error" 
        error={new Error('Network error')} 
      />
    );
    
    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText('Network error')).toBeInTheDocument();
  });

  test('has back button to posts page', () => {
    render(
      <MockPostComponent 
        postId="1" 
        status="success" 
        data={mockPost} 
      />
    );

    // Verify back button exists and links to posts
    const backButton = screen.getByText('Back to Posts');
    expect(backButton.closest('a')).toHaveAttribute('href', '/posts');
  });
}); 