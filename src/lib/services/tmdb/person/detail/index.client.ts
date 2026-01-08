import { useTmdbSWR } from 'lib/services/tmdb/utils.client';

import type { PersonDetailResponse } from './types';

export const usePersonDetail = (
  id: number,
  fallbackData?: PersonDetailResponse,
  isReady?: boolean
) =>
  useTmdbSWR<PersonDetailResponse>({
    path: `/person/${id}`,
    fallbackData,
    isReady,
  });
