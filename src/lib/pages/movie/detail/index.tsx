import { Grid } from '@chakra-ui/react';
import DetailMeta from 'lib/components/shared/DetailMeta';
import MovieDetailAdditionalInfo from 'lib/pages/movie/detail/components/additional-info';
import { BackButton } from 'lib/pages/movie/detail/components/back-button';
import CastsWrapper from 'lib/pages/movie/detail/components/casts-wrapper';
import { GenreList } from 'lib/pages/movie/detail/components/genre-list';
import type { MovieCreditsResponse } from 'lib/services/tmdb/movie/credits/types';
import type { MovieDetailResponse } from 'lib/services/tmdb/movie/detail/types';
import Head from 'next/head';
import { generateNextSeo } from 'next-seo/pages';

export type MovieDetailPageProps = {
  detailData: MovieDetailResponse;
  creditsData: MovieCreditsResponse;
};

export const MovieDetailPage = ({
  detailData: data,
  creditsData: credits,
}: MovieDetailPageProps) => (
  <Grid gridGap={[8, 16]} paddingX={8}>
    <Head>
      {generateNextSeo({
        description: data.tagline,
        title: data.title,
      })}
    </Head>

    <Grid flexBasis={['100%']} rowGap={8}>
      <BackButton />

      <DetailMeta
        data={{
          name: data.title,
          overview: data.overview,
          posterPath: data.poster_path,
          releasedDate: data.release_date,
          status: data.status,
          tagline: data.tagline,
        }}
        extras={<GenreList data={data} />}
      />
    </Grid>

    <Grid
      alignItems="center"
      flexBasis={['100%']}
      gap={8}
      templateColumns={{ base: 'minmax(0, 1fr)', md: '1fr minmax(0, 2fr)' }}
    >
      <MovieDetailAdditionalInfo data={data} />

      <CastsWrapper credits={credits} />
    </Grid>
  </Grid>
);
