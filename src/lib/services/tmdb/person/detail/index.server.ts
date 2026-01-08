import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';

import type { PersonDetailResponse } from './types';

export const getPersonDetailServer = (id: number) =>
  tmdbServerFetcher<PersonDetailResponse>(`/person/${id}`);
