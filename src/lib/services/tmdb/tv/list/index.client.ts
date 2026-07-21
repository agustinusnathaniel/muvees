import { useTmdbSWR } from 'lib/services/tmdb/utils.client';

import { TV_SHOW_SEARCH_RESOURCE_PATH } from './constants';
import type {
  SearchTVShowParams,
  TVShowListParams,
  TVShowListResponse,
  TVShowListType,
} from './types';

type UseTVShowByListArgs = {
  listType: TVShowListType;
  params?: TVShowListParams;
  fallbackData?: TVShowListResponse;
};

export const useTVShowByList = ({
  listType,
  params,
  fallbackData,
}: UseTVShowByListArgs) =>
  useTmdbSWR<TVShowListResponse>({
    fallbackData,
    params,
    path: `/tv/${listType}`,
  });

export const useTVShowSearchResultList = (params: SearchTVShowParams) =>
  useTmdbSWR<TVShowListResponse>({
    params,
    path: TV_SHOW_SEARCH_RESOURCE_PATH,
  });
