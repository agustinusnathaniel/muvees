import { Home } from 'lib/pages/home';
import { getMovieListServer } from 'lib/services/tmdb/movie/list/index.server';
import { getTVShowByListType } from 'lib/services/tmdb/tv/list/index.server';

export const revalidate = 43_200;

export default async function Page() {
  const [popularMovieData, popularTvShowData] = await Promise.all([
    getMovieListServer({ section: 'popular', revalidate: 43_200 }),
    getTVShowByListType('popular'),
  ]);

  return (
    <Home
      popularMovieData={popularMovieData}
      popularTvShowData={popularTvShowData}
    />
  );
}
