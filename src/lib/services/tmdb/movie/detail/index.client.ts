import { useTmdbSWR } from 'lib/services/tmdb/utils.client';

import type { MovieDetailResponse } from './types';

export const useMovieDetail = (
  id: number,
  fallbackData?: MovieDetailResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieDetailResponse>({
    path: `/movie/${id}`,
    fallbackData,
    isReady,
  });
