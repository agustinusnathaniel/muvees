'use client';

import { Button, Grid, Heading } from '@chakra-ui/react';
import ImageSection from 'lib/components/movie/image/ImageSection';
import { useMovieImages } from 'lib/services/tmdb/movie/images/index.client';
import { useParams, useRouter } from 'next/navigation';

export const MovieImagesPage = () => {
  const router = useRouter();
  const { id } = useParams();

  const { data } = useMovieImages(Number(id));

  return (
    <Grid gridGap={[8, 16]} templateColumns="minmax(0,1fr)">
      <Button marginX={8} onClick={() => router.back()}>
        back
      </Button>

      <Heading marginX={8}>Images</Heading>

      {data?.backdrops && (
        <ImageSection data={data.backdrops} maxHeight={300} title="Backdrops" />
      )}

      {data?.posters && (
        <ImageSection data={data.posters} maxHeight={200} title="Posters" />
      )}
    </Grid>
  );
};
