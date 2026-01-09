import { MULTI_SEARCH_RESOURCE_PATH } from 'lib/services/tmdb/search/multi/constants';
import type {
  MultiSearchParams,
  MultiSearchResponse,
} from 'lib/services/tmdb/search/multi/types';
import { useTmdbSWR } from 'lib/services/tmdb/utils.client';

export const useMultiSearchResult = (
  params: MultiSearchParams,
  isReady = true
) =>
  useTmdbSWR<MultiSearchResponse>({
    path: MULTI_SEARCH_RESOURCE_PATH,
    params,
    isReady,
  });
