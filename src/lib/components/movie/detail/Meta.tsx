import { Badge, Flex, useColorMode } from '@chakra-ui/react';
import DetailMeta from 'lib/components/shared/DetailMeta';
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
              as={Link}
              colorScheme="gray"
              cursor="pointer"
              href={`/movies/genre/${genre.id}?page=1`}
              key={`${genre.name}-${genre.id}`}
              variant={colorMode === 'light' ? 'solid' : 'outline'}
            >
              {genre.name}
            </Badge>
          ))}
        </Flex>
      }
    />
  );
};

export default MovieDetailMeta;
