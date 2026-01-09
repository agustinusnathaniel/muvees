import { useTmdbSWR } from 'lib/services/tmdb/utils.client';

import type { TvShowDetail } from './types';

export const useTvShowDetail = (id: string, fallbackData?: TvShowDetail) =>
  useTmdbSWR<TvShowDetail>({ path: `/tv/${id}`, fallbackData });
