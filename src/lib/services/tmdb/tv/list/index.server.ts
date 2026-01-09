import { TV_SHOW_SEARCH_RESOURCE_PATH } from 'lib/services/tmdb/tv/list/constants';
import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';

import type {
  SearchTVShowParams,
  TVShowListParams,
  TVShowListResponse,
  TVShowListType,
} from './types';

export const getTVShowByListType = (
  listType: TVShowListType,
  params?: TVShowListParams
) => tmdbServerFetcher<TVShowListResponse>(`/tv/${listType}`, params);

export const getTVShowSearchResultList = (params: SearchTVShowParams) =>
  tmdbServerFetcher<TVShowListResponse>(TV_SHOW_SEARCH_RESOURCE_PATH, params);
