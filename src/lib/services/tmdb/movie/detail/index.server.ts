import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';
import { cacheLife } from 'next/cache';

import type { MovieDetailResponse } from './types';

export async function getMovieDetailServer(id: number) {
  'use cache';
  cacheLife('weeks');

  return await tmdbServerFetcherCore<MovieDetailResponse>({
    path: `/movie/${id}`,
  });
}
