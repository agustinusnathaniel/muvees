'use client';

import { Badge, Flex } from '@chakra-ui/react';
import { useColorMode } from 'lib/components/ui/color-mode';
import type { MovieDetailSectionProps } from 'lib/pages/movie/detail/types';
import Link from 'next/link';

type GenreListProps = MovieDetailSectionProps;

export const GenreList = ({ data }: GenreListProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex gridGap={2} wrap="wrap">
      {(data.genres ?? []).map((genre) => (
        <Badge
          asChild
          colorScheme="gray"
          cursor="pointer"
          key={`${genre.name}-${genre.id}`}
          variant={colorMode === 'light' ? 'solid' : 'outline'}
        >
          <Link href={`/movies/genre/${genre.id}?page=1`} prefetch={false}>
            {genre.name}
          </Link>
        </Badge>
      ))}
    </Flex>
  );
};
