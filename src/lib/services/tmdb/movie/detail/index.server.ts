import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';

import type { MovieDetailResponse } from './types';

export const getMovieDetailServer = (id: number) =>
  tmdbServerFetcher<MovieDetailResponse>(`/movie/${id}`);
