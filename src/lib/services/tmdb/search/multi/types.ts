/**
 * Generated from:
 * - https://developers.themoviedb.org/3/search/multi-search
 * - https://app.quicktype.io/
 */

export interface MultiSearchParams {
  language?: string;
  query: string;
  page?: number;
  include_adult?: boolean;
  region?: string;
}

export interface MultiSearchResponse {
  page: number;
  results: Array<MultiSearchResult>;
  total_results: number;
  total_pages: number;
}

export interface MultiSearchResult {
  poster_path?: null | string;
  popularity: number;
  id: number;
  overview?: string;
  backdrop_path?: null | string;
  vote_average?: number;
  media_type: MediaType;
  first_air_date?: string;
  origin_country?: Array<string>;
  genre_ids?: Array<number>;
  original_language?: OriginalLanguage;
  vote_count?: number;
  name?: string;
  original_name?: string;
  adult?: boolean;
  release_date?: Date;
  original_title?: string;
  title?: string;
  video?: boolean;
  profile_path?: null | string;
  known_for?: Array<MultiSearchResult>;
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
