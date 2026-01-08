import { fetcher } from 'lib/utils/fetcher';

import { TMDB_API_KEY, TMDB_API_URL } from './constants';

// biome-ignore lint/suspicious/noExplicitAny: -
export const tmdbServerFetcher = <ResType>(path: string, params?: any) =>
  fetcher<ResType>(`${TMDB_API_URL}${path}`, {
    ...params,
    api_key: TMDB_API_KEY,
  });

export const tmdbFetcher = <ResType>([path, params]: [
  path: string,
  // biome-ignore lint/suspicious/noExplicitAny: -
  params?: any,
]) => fetcher<ResType>(`/api/tmdb${path}`, params);
