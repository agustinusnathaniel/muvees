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

  const [totalPages, setTotalPages] = useState<number>(0);
  const [shouldFetch, setShouldFetch] = useState<boolean>(false);

  const [queries, setQueries] = useState<MovieListParams>();

  useEffect(() => {
    if (page || query || genre) {
      switch (listMode) {
        case 'section':
          setQueries({
            page,
          });
          break;
        case 'search':
          setQueries({
            page,
            query: query as string,
          });
          break;
        case 'discover':
          setQueries({
            page,
            with_genres: genre as string,
          });
          break;
        default:
          break;
      }
    }
  }, [page, query, genre, listMode]);

  const { data, isLoading } = useMovieList(
    listMode === 'section' ? section : undefined,
    queries,
    undefined,
    listMode === 'search' ? shouldFetch : undefined
  );

  useEffect(() => {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    } catch {
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (data?.total_pages) {
      setTotalPages(data.total_pages);
    }
  }, [data]);

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

  const pageNavButtonProps: MovieListPageNavButtonProps = {
    isLoading,
    page,
    totalPages,
    listMode,
    section,
    genre,
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

  const renderMovieList = () => {
    if (listMode === 'search' && !shouldFetch) {
      return null;
    }

    return (
      <>
        {listMode !== 'search' && section && (
          <Heading textTransform="capitalize">
            {section.replace('_', ' ')}
          </Heading>
        )}
        <MovieListPageNavButtons {...pageNavButtonProps} />
        <MoviesContainer isLoading={isLoading} movies={data?.results} />
        <MovieListPageNavButtons {...pageNavButtonProps} />
      </>
    );
  };

  return (
    <Box mb={8} paddingX={8} w="full">
      <Head>{data && generateNextSeo({ title: generatePageHeadTitle() })}</Head>
      <Button borderRadius={24} onClick={() => router.push('/')} width="full">
        back
      </Button>

      {listMode === 'search' && query && <SearchBox />}

      <Box marginY={8}>{renderMovieList()}</Box>
    </Box>
  );
};
