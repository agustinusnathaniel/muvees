import { Grid } from '@chakra-ui/react';
import MoviesSlider from 'lib/components/movie/MoviesSlider';
import TvShowSlider from 'lib/components/tv/TvShowSlider';
import type { MovieListResponse } from 'lib/services/tmdb/movie/list/types';
import type { TVShowListResponse } from 'lib/services/tmdb/tv/list/types';

type HomePageProps = {
  popularMovieData: MovieListResponse;
  popularTvShowData: TVShowListResponse;
};

export const Home = ({
  popularMovieData,
  popularTvShowData,
}: HomePageProps) => {
  return (
    <Grid mb={8} padding={[0, 8]} rowGap={8} w="full">
      <MoviesSlider
        movies={popularMovieData?.results}
        sectionTitle="Popular Movies"
      />
      <TvShowSlider
        sectionTitle="Popular TV Shows"
        shows={popularTvShowData.results}
      />
    </Grid>
  );
};
