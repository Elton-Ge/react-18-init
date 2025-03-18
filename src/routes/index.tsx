import { createFileRoute } from '@tanstack/react-router';

export const Home = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">Welcome to Our App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Features</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Modern React with TypeScript</li>
            <li>• TanStack Router for navigation</li>
            <li>• React Query for data fetching</li>
            <li>• Tailwind CSS for styling</li>
          </ul>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Getting Started</h3>
          <p className="text-gray-600">
            Explore our features by navigating through the menu above. Check out our Posts section
            to see data fetching in action, or visit the About page to learn more about our project.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Home,
});
