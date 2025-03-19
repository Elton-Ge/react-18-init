import { Music } from '@/components/Music';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/music')({
  component: Music,
});
