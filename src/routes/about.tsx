import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const ExampleQuery = lazy(() => import('../components/ExampleQuery'));
const About = () => {
  return (
    <div>
      <ExampleQuery />
    </div>
  );
};

export default About;

export const Route = createFileRoute('/about')({
  component: About,
});
