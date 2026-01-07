import { Button, Grid, Heading } from '@chakra-ui/react';
import ImageSection from 'lib/components/movie/image/ImageSection';
import { useRouter } from 'next/router';

import type { MovieImagesPageProps } from './types';

const MovieImagesPage = ({ data }: MovieImagesPageProps) => {
  const router = useRouter();

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

export default MovieImagesPage;
