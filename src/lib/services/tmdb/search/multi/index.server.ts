import { MULTI_SEARCH_RESOURCE_PATH } from 'lib/services/tmdb/search/multi/constants';
import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';

import type { MultiSearchParams, MultiSearchResponse } from './types';

export const getMultiSearchResult = (params: MultiSearchParams) =>
  tmdbServerFetcher<MultiSearchResponse>(MULTI_SEARCH_RESOURCE_PATH, params);
