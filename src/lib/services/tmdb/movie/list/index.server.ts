import { movieListEndpoint } from 'lib/services/tmdb/movie/list/utils';
import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';

import type { ListType, MovieListParams, MovieListResponse } from './types';

export const getMovieListServer = (
  section: ListType = 'popular',
  params?: MovieListParams
) =>
  tmdbServerFetcher<MovieListResponse>(
    movieListEndpoint({
      section,
      query: params?.query,
      with_genres: params?.with_genres,
    }),
    params
  );
