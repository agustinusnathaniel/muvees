import { PersonDetailResponse } from "services/tmdb/person/detail/types";

export type PersonDetailPageParams = {
  id: string;
};

export type PersonDetailPageProps = {
  fallbackData?: PersonDetailResponse;
};
