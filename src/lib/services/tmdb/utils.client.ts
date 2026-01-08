import { tmdbFetcher } from 'lib/services/tmdb/utils.server';
import useSWR from 'swr';

export type UseTmdbSWRArgs<ResType> = {
  path: string;
  // biome-ignore lint/suspicious/noExplicitAny: -
  params?: any;
  fallbackData?: ResType;
  isReady?: boolean;
};

// biome-ignore lint/suspicious/noExplicitAny: -
export const useTmdbSWR = <ResType, ErrorType = any>({
  path,
  params,
  fallbackData,
  isReady = true,
}: UseTmdbSWRArgs<ResType>) => {
  const { data, error, isLoading, mutate } = useSWR<ResType, ErrorType>(
    isReady ? [path, params] : null,
    tmdbFetcher,
    {
      fallbackData,
    }
  );

  return {
    data,
    isLoading,
    isError: error,
    mutate,
  };
};
