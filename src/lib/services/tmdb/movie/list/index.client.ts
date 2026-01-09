import { movieListEndpoint } from 'lib/services/tmdb/movie/list/utils';
import { useTmdbSWR } from 'lib/services/tmdb/utils.client';

import type { ListType, MovieListParams, MovieListResponse } from './types';

export const useMovieList = (
  section: ListType = 'popular',
  params?: MovieListParams,
  fallbackData?: MovieListResponse,
  isReady?: boolean
) =>
  useTmdbSWR<MovieListResponse>({
    path: movieListEndpoint({
      section,
      query: params?.query,
      with_genres: params?.with_genres,
    }),
    params,
    fallbackData,
    isReady,
  });

export const useMovieRecommendations = (id: number) =>
  useTmdbSWR<MovieListResponse>({ path: `/movie/${id}/recommendations` });
