import { createFileRoute } from '@tanstack/react-router';

export const About = () => {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-4xl font-bold mb-6 text-gray-900">About Our Project</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Our Technology Stack</h3>
          <p className="text-gray-600">
            Built with modern web technologies, our application demonstrates the power of React
            combined with TypeScript for type-safe development. We utilize TanStack Router for
            seamless navigation and React Query for efficient data management.
          </p>
        </div>
        <div className="card">
          <h3 className="text-xl font-semibold mb-3 text-gray-800">Project Goals</h3>
          <p className="text-gray-600">
            This project serves as a demonstration of best practices in modern web development,
            including responsive design, component reusability, and efficient state management. We
            focus on delivering a smooth user experience while maintaining clean, maintainable code.
          </p>
        </div>
      </div>
    </div>
  );
};

export const Route = createFileRoute('/about')({
  component: About,
});
