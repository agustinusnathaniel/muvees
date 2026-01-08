import { MovieListContainer } from 'lib/components/movie/list';

export default async function Page({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;

  return <MovieListContainer genre={genre} listMode="discover" />;
}
