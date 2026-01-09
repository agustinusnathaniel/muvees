import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';

import type { MovieDetailResponse } from './types';

export const getMovieDetailServer = (id: number) =>
  tmdbServerFetcherCore<MovieDetailResponse>({
    path: `/movie/${id}`,
    reqInit: { next: { revalidate: 604_800 } },
  });
