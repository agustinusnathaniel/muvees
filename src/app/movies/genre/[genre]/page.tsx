import MovieListContainer from '../../movie-list-container';

export default async function Page({
  params,
}: {
  params: Promise<{ genre: string }>;
}) {
  const { genre } = await params;

  return <MovieListContainer listMode="discover" genre={genre} />;
}
