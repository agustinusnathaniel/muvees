/**
 * Generated from:
 * - https://developers.themoviedb.org/3/tv/get-tv-details
 * - https://app.quicktype.io/
 */

export interface TvShowDetailParams {
  append_to_response?: string;
  language?: string;
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
  networks: Array<Network>;
  next_episode_to_air?: null;
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
  credit_id: string;
  gender: number;
  id: number;
  name: string;
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
  id: number;
  logo_path?: null | string;
  name: string;
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
