import { TMovieListParams } from "./types";

const SEARCH_RESOURCE_PATH = '/search/movie';
const DISCOVER_RESOURCE_PATH = '/discover/movie';

export const movieListEndpoint = ({
  section,
  query,
  with_genres,
}: TMovieListParams) => {
  if (query) {
    return SEARCH_RESOURCE_PATH;
  }
  if (with_genres) {
    return DISCOVER_RESOURCE_PATH;
  }
  return `/movie/${section}`;
};