export enum MovieListMode {
  section = 0,
  search = 1,
  discover = 2,
}

export type MovieListModeKey = keyof typeof MovieListMode;
