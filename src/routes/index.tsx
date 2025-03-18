import { createFileRoute } from '@tanstack/react-router';

const Home = () => {
  return <div>Home</div>;
};

export default Home;
export const Route = createFileRoute('/')({
  component: Home,
});
