'use client';

import { Grid } from '@chakra-ui/react';
import MoviesSlider from 'lib/components/movie/MoviesSlider';
import TvShowSlider from 'lib/components/tv/TvShowSlider';
import type { HomePageProps } from 'lib/pages/home/types';

const Home = ({ popularMovieData, popularTvShowData }: HomePageProps) => {
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

export default Home;
