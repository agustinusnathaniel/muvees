import type { ListType } from 'lib/services/tmdb/movie/list/types';
import MovieListContainer from '../movie-list-container';

export default async function Page({
  params,
}: {
  params: Promise<{ section: ListType }>;
}) {
  const { section } = await params;

  return <MovieListContainer listMode="section" section={section} />;
}
