'use client';

import { Box, Button, Heading } from '@chakra-ui/react';
import {
  type MovieListPageNavButtonProps,
  MovieListPageNavButtons,
} from 'lib/components/movie/list/components';
import type { MovieListModeKey } from 'lib/components/movie/list/types';
import MoviesContainer from 'lib/components/movie/MoviesContainer';
import SearchBox from 'lib/components/movie/SearchBox';
import { useMovieList } from 'lib/services/tmdb/movie/list/index.client';
import type {
  ListType,
  MovieListParams,
} from 'lib/services/tmdb/movie/list/types';
import Head from 'next/head';
import { useRouter, useSearchParams } from 'next/navigation';
import { generateNextSeo } from 'next-seo/pages';
import { useEffect, useState } from 'react';

type MovieListContainerProps = {
  listMode: MovieListModeKey;
  section?: ListType;
  genre?: string;
};

function useMovieListQueries(
  listMode: MovieListModeKey,
  page: number,
  query: string | null,
  genre: string | undefined
) {
  const [queries, setQueries] = useState<MovieListParams>();
  useEffect(() => {
    if (!(page || query || genre)) {
      return;
    }
    switch (listMode) {
      case 'section':
        setQueries({ page });
        break;
      case 'search':
        setQueries({ page, query: query as string });
        break;
      case 'discover':
        setQueries({ page, with_genres: genre as string });
        break;
      default:
        break;
    }
  }, [page, query, genre, listMode]);
  return queries;
}

function useShouldFetch(
  listMode: MovieListModeKey,
  query: string | null,
  genre: string | undefined
) {
  const [shouldFetch, setShouldFetch] = useState(false);
  useEffect(() => {
    if (
      (listMode === 'search' && query) ||
      (listMode === 'discover' && genre)
    ) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [listMode, query, genre]);
  return shouldFetch;
}

function useTotalPages(data: { total_pages?: number } | undefined) {
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    if (data?.total_pages) {
      setTotalPages(data.total_pages);
    }
  }, [data]);
  return totalPages;
}

function MovieListContent({
  listMode,
  section,
  isLoading,
  data,
  pageNavButtonProps,
  shouldFetch,
}: {
  listMode: MovieListModeKey;
  section?: ListType;
  isLoading: boolean;
  data: { results?: Array<unknown> } | undefined;
  pageNavButtonProps: MovieListPageNavButtonProps;
  shouldFetch: boolean;
}) {
  if (listMode === 'search' && !shouldFetch) {
    return null;
  }
  return (
    <>
      {listMode !== 'search' && section && (
        <Heading
          as="h2"
          fontWeight="bold"
          size="4xl"
          textTransform="capitalize"
        >
          {section.replace('_', ' ')}
        </Heading>
      )}
      <MovieListPageNavButtons {...pageNavButtonProps} />
      <MoviesContainer isLoading={isLoading} movies={data?.results as never} />
      <MovieListPageNavButtons {...pageNavButtonProps} />
    </>
  );
}

export const MovieListContainer = ({
  listMode,
  section,
  genre,
}: MovieListContainerProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qPage = searchParams.get('page');
  const query = searchParams.get('query');
  const page = qPage ? Number(qPage) : 1;

  const queries = useMovieListQueries(listMode, page, query, genre);
  const shouldFetch = useShouldFetch(listMode, query, genre);
  const { data, isLoading } = useMovieList(
    listMode === 'section' ? section : undefined,
    queries,
    undefined,
    listMode === 'search' ? shouldFetch : undefined
  );
  const totalPages = useTotalPages(
    data as { total_pages?: number } | undefined
  );

  useEffect(() => {
    try {
      window.scroll({ behavior: 'smooth', left: 0, top: 0 });
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  const pageNavButtonProps: MovieListPageNavButtonProps = {
    genre,
    isLoading,
    listMode,
    page,
    section,
    totalPages,
  };

  const generatePageHeadTitle = () => {
    switch (listMode) {
      case 'section':
        return section as string;
      case 'search':
        return `search: "${decodeURI(query as string)}"`;
      default:
        return '';
    }
  };

  return (
    <Box mb={8} paddingX={8} w="full">
      <Head>{data && generateNextSeo({ title: generatePageHeadTitle() })}</Head>
      <Button borderRadius={24} onClick={() => router.push('/')} width="full">
        back
      </Button>
      {listMode === 'search' && query && <SearchBox />}
      <Box marginY={8}>
        <MovieListContent
          data={data as never}
          isLoading={isLoading}
          listMode={listMode}
          pageNavButtonProps={pageNavButtonProps}
          section={section}
          shouldFetch={shouldFetch}
        />
      </Box>
    </Box>
  );
};
