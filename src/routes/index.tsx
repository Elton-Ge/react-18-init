import { createFileRoute } from '@tanstack/react-router';

// import ExampleQuery from '../components/ExampleQuery';

const Home = () => {
  return <div>Home</div>;
};

export default Home;
export const Route = createFileRoute('/')({
  component: Home,
});
