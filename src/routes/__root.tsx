import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { ThemeProvider, useTheme } from '../contexts/ThemeContext';
import { NotFound } from '../components/NotFound';

const RootLayout = () => {
  const { theme, toggleTheme } = useTheme();
  console.log(theme);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-sm mb-6 transition-colors">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <Link
                to="/"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-medium [&.active]:text-blue-600 dark:[&.active]:text-blue-400 [&.active]:font-semibold"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-medium [&.active]:text-blue-600 dark:[&.active]:text-blue-400 [&.active]:font-semibold"
              >
                About
              </Link>
              <Link
                to="/posts"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-medium [&.active]:text-blue-600 dark:[&.active]:text-blue-400 [&.active]:font-semibold"
              >
                Posts
              </Link>
              <Link
                to="/music"
                className="text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-medium [&.active]:text-blue-600 dark:[&.active]:text-blue-400 [&.active]:font-semibold"
              >
                Music
              </Link>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>
          </div>
        </div>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
};

export const Route = createRootRoute({
  notFoundComponent: NotFound,
  component: () => (
    <ThemeProvider>
      <RootLayout />
    </ThemeProvider>
  ),
});
