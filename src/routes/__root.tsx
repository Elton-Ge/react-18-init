import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <nav className="bg-white shadow-sm mb-6">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition-medium [&.active]:text-blue-600 [&.active]:font-semibold"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-600 transition-medium [&.active]:text-blue-600 [&.active]:font-semibold"
            >
              About
            </Link>
            <Link
              to="/posts"
              className="text-gray-700 hover:text-blue-600 transition-medium [&.active]:text-blue-600 [&.active]:font-semibold"
            >
              Posts
            </Link>
          </div>
        </div>
      </nav>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
