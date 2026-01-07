import { Button, Grid, Skeleton, Text } from '@chakra-ui/react';
import type { MovieListResponse } from 'lib/services/tmdb/movie/list/types';
import { useRouter } from 'next/router';

import type { MovieListModeKey } from './types';

export type PageNavButtonProps = {
  isLoading: boolean;
  page?: number;
  totalPages: number;
  results?: MovieListResponse['results'];
  listMode: MovieListModeKey;
};

const PageNavButtons = ({
  isLoading,
  results,
  page = 0,
  totalPages,
  listMode,
}: PageNavButtonProps) => {
  const router = useRouter();
  const {
    query: { section, genre, query },
  } = router;

  const handleChangePage = (type: 'next' | 'prev') => () => {
    const changePageNum = type === 'next' ? page + 1 : page - 1;

    const nextRoute = () => {
      switch (listMode) {
        case 'section':
          return `/movies/${section}?page=${changePageNum}`;
        case 'search':
          return `/movies/search?query=${query}&page=${changePageNum}`;
        case 'discover':
          return `/movies/genre/${genre}?page=${changePageNum}`;
        default:
          return `/movies/${section}?page=${changePageNum}`;
      }
    };

    router.push(nextRoute());
  };

  return (
    <Skeleton isLoaded={!isLoading} marginY={4}>
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
            <Button isDisabled={page === 1} onClick={handleChangePage('prev')}>
              prev
            </Button>
            <Button
              isDisabled={page === totalPages}
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
