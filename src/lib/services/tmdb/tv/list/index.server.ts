import { TV_SHOW_SEARCH_RESOURCE_PATH } from 'lib/services/tmdb/tv/list/constants';
import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';
import { cacheLife } from 'next/cache';

import type {
  SearchTVShowParams,
  TVShowListParams,
  TVShowListResponse,
  TVShowListType,
} from './types';

export async function getTVShowByListType(
  listType: TVShowListType,
  params?: TVShowListParams
) {
  'use cache';
  cacheLife('hours');

  return await tmdbServerFetcher<TVShowListResponse>(`/tv/${listType}`, params);
}

export const getTVShowSearchResultList = (params: SearchTVShowParams) =>
  tmdbServerFetcher<TVShowListResponse>(TV_SHOW_SEARCH_RESOURCE_PATH, params);
