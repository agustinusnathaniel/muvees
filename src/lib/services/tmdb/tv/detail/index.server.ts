import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';

import type { TvShowDetail } from './types';

export const getTvShowDetail = (id: string) =>
  tmdbServerFetcherCore<TvShowDetail>({
    path: `/tv/${id}`,
    reqInit: { next: { revalidate: 604_800 } },
  });
