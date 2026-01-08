import { Badge, Flex } from '@chakra-ui/react';
import DetailMeta from 'lib/components/shared/DetailMeta';
import { useColorMode } from 'lib/components/ui/color-mode';
import Link from 'next/link';

import type { MovieDetailSectionProps } from './types';

type MovieDetailMetaProps = MovieDetailSectionProps;

const MovieDetailMeta = ({ data }: MovieDetailMetaProps) => {
  const { colorMode } = useColorMode();

  return (
    <DetailMeta
      data={{
        name: data.title,
        tagline: data.tagline,
        status: data.status,
        releasedDate: data.release_date,
        posterPath: data.poster_path,
        overview: data.overview,
      }}
      extras={
        <Flex gridGap={2} wrap="wrap">
          {data.genres.map((genre) => (
            <Badge
              asChild
              colorScheme="gray"
              cursor="pointer"
              key={`${genre.name}-${genre.id}`}
              variant={colorMode === 'light' ? 'solid' : 'outline'}
            >
              <Link href={`/movies/genre/${genre.id}?page=1`}>
                {genre.name}
              </Link>
            </Badge>
          ))}
        </Flex>
      }
    />
  );
};

export default MovieDetailMeta;
