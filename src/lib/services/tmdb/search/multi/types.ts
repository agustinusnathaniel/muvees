/**
 * Generated from:
 * - https://developers.themoviedb.org/3/search/multi-search
 * - https://app.quicktype.io/
 */

export interface MultiSearchParams {
  include_adult?: boolean;
  language?: string;
  page?: number;
  query: string;
  region?: string;
}

export interface MultiSearchResponse {
  page: number;
  results: Array<MultiSearchResult>;
  total_pages: number;
  total_results: number;
}

export interface MultiSearchResult {
  adult?: boolean;
  backdrop_path?: null | string;
  first_air_date?: string;
  genre_ids?: Array<number>;
  id: number;
  known_for?: Array<MultiSearchResult>;
  media_type: MediaType;
  name?: string;
  origin_country?: Array<string>;
  original_language?: OriginalLanguage;
  original_name?: string;
  original_title?: string;
  overview?: string;
  popularity: number;
  poster_path?: null | string;
  profile_path?: null | string;
  release_date?: Date;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}

export enum MediaType {
  Movie = 'movie',
  Person = 'person',
  Tv = 'tv',
}

export enum OriginalLanguage {
  En = 'en',
  It = 'it',
}
