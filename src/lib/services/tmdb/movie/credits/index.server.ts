import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';
import { cacheLife } from 'next/cache';

import type { MovieCreditsResponse } from './types';

export async function getMovieCreditsServer(id: number) {
  'use cache';
  cacheLife('weeks');

  return await tmdbServerFetcherCore<MovieCreditsResponse>({
    path: `/movie/${id}/credits`,
  });
}
