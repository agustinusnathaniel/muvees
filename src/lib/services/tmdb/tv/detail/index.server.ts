import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';
import { cacheLife } from 'next/cache';

import type { TvShowDetail } from './types';

export async function getTvShowDetail(id: string) {
  'use cache';
  cacheLife('weeks');

  return await tmdbServerFetcherCore<TvShowDetail>({
    path: `/tv/${id}`,
  });
}
