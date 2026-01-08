import { tmdbServerFetcher } from 'lib/services/tmdb/utils.server';

import type { MovieImagesResponse } from './types';

export const getMovieImagesServer = (id: number) =>
  tmdbServerFetcher<MovieImagesResponse>(`/movie/${id}/images`);
