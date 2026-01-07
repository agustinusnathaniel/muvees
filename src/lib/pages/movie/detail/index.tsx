import { Button, Grid } from '@chakra-ui/react';
import MovieDetailAdditionalInfo from 'lib/components/movie/detail/AdditionalInfo';
import CastsWrapper from 'lib/components/movie/detail/CastsWrapper';
import MovieDetailMeta from 'lib/components/movie/detail/Meta';
import { handleRouteBack } from 'lib/utils/handleRouteBack';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { generateNextSeo } from 'next-seo/pages';
import { useEffect, useState } from 'react';

import type { MovieDetailPageProps } from './types';

const MovieDetailPage = ({
  detailData: data,
  creditsData: credits,
}: MovieDetailPageProps) => {
  const router = useRouter();
  const [movieId, setMovieId] = useState<number>();

  const {
    query: { id },
  } = router;

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
        <Button onClick={handleRouteBack(router)} width={['full', 'full', 100]}>
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

export default MovieDetailPage;
