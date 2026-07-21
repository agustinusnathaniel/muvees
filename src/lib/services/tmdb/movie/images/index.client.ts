import { useTmdbSWR } from 'lib/services/tmdb/utils.client';

import type { MovieImagesResponse } from './types';

export const useMovieImages = (
  id: number,
  fallbackData?: MovieImagesResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieImagesResponse>({
    fallbackData,
    isReady,
    path: `/movie/${id}/images`,
  });
