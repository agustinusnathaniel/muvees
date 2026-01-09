import { MovieListContainer } from 'lib/components/movie/list';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  await searchParams;

  return <MovieListContainer listMode="search" />;
}
