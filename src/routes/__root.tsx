import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold [&.active]:text-red-600">
          Home
        </Link>
        <Link to="/about" className="[&.active]:font-bold [&.active]:text-red-600">
          About
        </Link>
        <Link to="/posts" className="[&.active]:font-bold [&.active]:text-red-600">
          Posts
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
