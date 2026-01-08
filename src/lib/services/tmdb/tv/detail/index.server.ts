import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';

import type { TvShowDetail } from './types';

export const getTvShowDetail = (id: string) =>
  tmdbServerFetcher<TvShowDetail>(`/tv/${id}`);
