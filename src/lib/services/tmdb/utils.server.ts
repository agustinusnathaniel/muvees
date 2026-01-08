import { fetcher } from 'lib/utils/fetcher';

import { TMDB_API_KEY, TMDB_API_URL } from './constants';

export const tmdbServerFetcherCore = async <ResType>({
  path,
  params,
  reqInit,
}: {
  path: string;
  // biome-ignore lint/suspicious/noExplicitAny: -
  params?: Record<string, any>;
  reqInit?: RequestInit;
}) => {
  const prm = new URLSearchParams(params);
  const res = await fetch(
    `${TMDB_API_URL}${path}?api_key=${TMDB_API_KEY}&${prm.toString()}`,
    reqInit
  );

  return res.json() as ResType;
};

// biome-ignore lint/suspicious/noExplicitAny: -
export const tmdbServerFetcher = <ResType>(path: string, params?: any) =>
  fetcher<ResType>(`${TMDB_API_URL}${path}`, {
    ...params,
    api_key: TMDB_API_KEY,
  });
