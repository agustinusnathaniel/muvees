/**
 * Generated from:
 * - https://developers.themoviedb.org/3/tv/get-tv-details
 * - https://app.quicktype.io/
 */

export interface TvShowDetailParams {
  language?: string;
  append_to_response?: string;
}

export interface TvShowDetail {
  backdrop_path?: string;
  created_by: Array<CreatedBy>;
  episode_run_time: Array<number>;
  first_air_date: Date;
  genres: Array<Genre>;
  homepage: string;
  id: number;
  in_production: boolean;
  languages: Array<string>;
  last_air_date: Date;
  last_episode_to_air: LastEpisodeToAir;
  name: string;
  next_episode_to_air?: null;
  networks: Array<Network>;
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: Array<string>;
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  production_companies: Array<Network>;
  production_countries: Array<ProductionCountry>;
  seasons: Array<Season>;
  spoken_languages: Array<SpokenLanguage>;
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path?: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface LastEpisodeToAir {
  air_date: Date;
  episode_number: number;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  season_number: number;
  still_path?: string;
  vote_average: number;
  vote_count: number;
}

export interface Network {
  name: string;
  id: number;
  logo_path?: null | string;
  origin_country: string;
}

export interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

export interface Season {
  air_date: Date;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}
