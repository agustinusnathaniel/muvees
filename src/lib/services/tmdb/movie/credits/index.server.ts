import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';

import type { MovieCreditsResponse } from './types';

export const getMovieCreditsServer = (id: number) =>
  tmdbServerFetcher<MovieCreditsResponse>(`/movie/${id}/credits`);
