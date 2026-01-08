import DetailMeta from 'lib/components/shared/DetailMeta';
import { handleRouteBack } from 'lib/utils/handleRouteBack';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { generateNextSeo } from 'next-seo/pages';

import type { TvShowDetailPageProps } from './types';

const TvShowDetailPage = ({ data }: TvShowDetailPageProps) => {
  const router = useRouter();
  const { colorMode } = useColorMode();

  return (
    <Grid gridGap={[8, 16]} paddingX={8}>
      <Head>
        {generateNextSeo({
          description: data.tagline,
          title: data.name,
        })}
      </Head>

      <Grid flexBasis={['100%']} rowGap={8}>
        <Button onClick={handleRouteBack(router)} width={['full', 'full', 100]}>
          back
        </Button>

        <DetailMeta
          data={{
            name: data.name,
            posterPath: data.poster_path,
            status: data.status,
            releasedDate: data.first_air_date,
            tagline: data.tagline,
            overview: data.overview,
          }}
          extras={
            <Flex gridGap={2} wrap="wrap">
              {data.genres.map((genre) => (
                <Badge
                  colorScheme="gray"
                  cursor="pointer"
                  key={`${genre.name}-${genre.id}`}
                  variant={colorMode === 'light' ? 'solid' : 'outline'}
                >
                  {genre.name}
                </Badge>
              ))}
            </Flex>
          }
        />
      </Grid>
    </Grid>
  );
};

export default TvShowDetailPage;
