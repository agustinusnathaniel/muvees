'use client';

import { Button, Grid } from '@chakra-ui/react';
import MovieDetailAdditionalInfo from 'lib/components/movie/detail/AdditionalInfo';
import CastsWrapper from 'lib/components/movie/detail/CastsWrapper';
import MovieDetailMeta from 'lib/components/movie/detail/Meta';
import type { MovieCreditsResponse } from 'lib/services/tmdb/movie/credits/types';
import type { MovieDetailResponse } from 'lib/services/tmdb/movie/detail/types';
import Head from 'next/head';
import { useParams, useRouter } from 'next/navigation';
import { generateNextSeo } from 'next-seo/pages';
import { useEffect, useState } from 'react';

export type MovieDetailPageProps = {
  detailData: MovieDetailResponse;
  creditsData: MovieCreditsResponse;
};

export const MovieDetailPage = ({
  detailData: data,
  creditsData: credits,
}: MovieDetailPageProps) => {
  const router = useRouter();
  const params = useParams();
  const [movieId, setMovieId] = useState<number>();

  const { id } = params;

  useEffect(() => {
    if (id) {
      setMovieId(Number(id));
    }
  }, [id]);

  return (
    <Grid gridGap={[8, 16]} paddingX={8}>
      <Head>
        {generateNextSeo({
          description: data.tagline,
          title: data.title,
        })}
      </Head>

      <Grid flexBasis={['100%']} rowGap={8}>
        <Button onClick={() => router.back()} width={['full', 'full', 100]}>
          back
        </Button>

        <MovieDetailMeta data={data} />
      </Grid>

      <Grid
        alignItems="center"
        flexBasis={['100%']}
        gap={8}
        templateColumns={{ base: 'minmax(0, 1fr)', md: '1fr minmax(0, 2fr)' }}
      >
        <MovieDetailAdditionalInfo data={data} id={movieId ?? 0} />

        <CastsWrapper credits={credits} />
      </Grid>
    </Grid>
  );
};
