import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';

import type { MovieCreditsResponse } from './types';

export const getMovieCreditsServer = (id: number) =>
  tmdbServerFetcherCore<MovieCreditsResponse>({
    path: `/movie/${id}/credits`,
    reqInit: { next: { revalidate: 604_800 } },
  });
