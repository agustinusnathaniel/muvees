import MovieListContainer from '../movie-list-container';

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  await searchParams;

  return <MovieListContainer listMode="search" />;
}
