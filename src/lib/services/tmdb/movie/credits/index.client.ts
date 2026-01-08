import { useTmdbSWR } from 'lib/services/tmdb/utils.client';

import type { MovieCreditsResponse } from './types';

export const useMovieCredits = (
  id: number,
  fallbackData?: MovieCreditsResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieCreditsResponse>({
    path: `/movie/${id}/credits`,
    fallbackData,
    isReady,
  });
