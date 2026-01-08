import { getMovieListServer } from 'lib/services/tmdb/movie/list/index.server';
import { getTVShowByListType } from 'lib/services/tmdb/tv/list/index.server';

import Home from './home-page';

export const revalidate = 43_200;

export default async function Page() {
  const [popularMovieData, popularTvShowData] = await Promise.all([
    getMovieListServer('popular'),
    getTVShowByListType('popular'),
  ]);

  console.info({ popularMovieData });

  return (
    <Home
      popularMovieData={popularMovieData}
      popularTvShowData={popularTvShowData}
    />
  );
}
