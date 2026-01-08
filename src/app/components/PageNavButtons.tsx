'use client';

import { Button, Grid, Skeleton, Text } from '@chakra-ui/react';
import type { MovieListModeKey } from 'lib/components/movie/list/types';
import type { ListType } from 'lib/services/tmdb/movie/list/types';
import type { TmdbAPIListResponse } from 'lib/services/tmdb/types';
import { useRouter, useSearchParams } from 'next/navigation';

export type PageNavButtonProps = {
  isLoading: boolean;
  page?: number;
  totalPages: number;
  results?: TmdbAPIListResponse<unknown>['results'];
  listMode: MovieListModeKey;
  section?: ListType;
  genre?: string;
};

const PageNavButtons = ({
  isLoading,
  results,
  page = 0,
  totalPages,
  listMode,
  section,
  genre,
}: PageNavButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangePage = (type: 'next' | 'prev') => () => {
    const changePageNum = type === 'next' ? page + 1 : page - 1;

    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set('page', changePageNum.toString());

    const nextRoute = () => {
      switch (listMode) {
        case 'section':
          return `/movies/${section}?${currentSearchParams.toString()}`;
        case 'search':
          return `/movies/search?${currentSearchParams.toString()}`;
        case 'discover':
          return `/movies/genre/${genre}?${currentSearchParams.toString()}`;
        default:
          return `/movies/${section}?${currentSearchParams.toString()}`;
      }
    };

    router.push(nextRoute());
  };

  return (
    <Skeleton loading={!!isLoading} marginY={4}>
      {results?.length ? (
        <Grid rowGap={4}>
          <Text
            fontSize="sm"
            letterSpacing={2}
            marginY={2}
            textAlign="center"
            textTransform="uppercase"
          >
            Page: <b>{page ?? 0}</b> / {totalPages}
          </Text>

          <Grid gap={4} templateColumns={['repeat(2, 1fr)']}>
            <Button disabled={page === 1} onClick={handleChangePage('prev')}>
              prev
            </Button>
            <Button
              disabled={page === totalPages}
              onClick={handleChangePage('next')}
            >
              next
            </Button>
          </Grid>
        </Grid>
      ) : null}
    </Skeleton>
  );
};

export default PageNavButtons;
