import { movieListEndpoint } from 'lib/services/tmdb/movie/list/utils';
import { tmdbServerFetcherCore } from 'lib/services/tmdb/utils.server';

import type { ListType, MovieListParams, MovieListResponse } from './types';

export const getMovieListServer = ({
  section = 'popular',
  params,
  revalidate,
}: {
  section: ListType;
  params?: MovieListParams;
  revalidate?: number;
}) =>
  tmdbServerFetcherCore<MovieListResponse>({
    params,
    path: movieListEndpoint({
      query: params?.query,
      section,
      with_genres: params?.with_genres,
    }),
    reqInit: { next: { revalidate } },
  });
