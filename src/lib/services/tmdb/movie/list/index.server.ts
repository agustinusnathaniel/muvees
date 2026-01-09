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
    path: movieListEndpoint({
      section,
      query: params?.query,
      with_genres: params?.with_genres,
    }),
    params,
    reqInit: { next: { revalidate } },
  });
