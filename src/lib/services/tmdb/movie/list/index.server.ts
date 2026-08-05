import { movieListEndpoint } from 'lib/services/tmdb/movie/list/utils';
import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';
import { cacheLife } from 'next/cache';

import type { ListType, MovieListParams, MovieListResponse } from './types';

export async function getMovieListServer({
  section = 'popular',
  params,
}: {
  section: ListType;
  params?: MovieListParams;
}) {
  'use cache';
  cacheLife('hours');

  return await tmdbServerFetcherCore<MovieListResponse>({
    params,
    path: movieListEndpoint({
      query: params?.query,
      section,
      with_genres: params?.with_genres,
    }),
  });
}
