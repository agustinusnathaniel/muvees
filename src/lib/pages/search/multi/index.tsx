'use client';

import { Flex, Grid, Input, Skeleton, Spinner, Text } from '@chakra-ui/react';
import type { PageNavButtonProps } from 'lib/components/shared/list/page-nav-buttons';
import PageNavButtons from 'lib/components/shared/list/page-nav-buttons';
import PosterCard from 'lib/components/shared/PosterCard';
import { BASE_URL } from 'lib/constants/baseUrl';
import { useMultiSearchResult } from 'lib/services/tmdb/search/multi/index.client';
import debounce from 'lodash/debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useMemo } from 'react';

function useMultiSearchParams() {
  const searchParams = useSearchParams();
  const qPage = searchParams.get('page');
  const qQuery = searchParams.get('query');
  const page = qPage && Number(qPage) > 0 ? Number(qPage) : 1;
  const query = qQuery as string;
  const { data, isLoading } = useMultiSearchResult(
    { page, query },
    query?.length > 0
  );
  return { data, isLoading, page, query };
}

function useMultiSearchNavigation(
  page: number,
  data: { total_pages?: number } | undefined,
  pathname: string | null,
  router: ReturnType<typeof useRouter>
) {
  const handleChangeQuery = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const queryParam = e.target.value ? `query=${e.target.value}&page=1` : '';
      router.push(`/search?${queryParam}`);
    }, 500),
    []
  );

  const handleChangePage = useCallback(
    (updatedPage: number) => {
      const queryParams = new URL(BASE_URL + (pathname || '')).searchParams;
      queryParams.set('page', updatedPage.toString());
      router.push(`/search?${queryParams.toString()}`);
    },
    [pathname, router]
  );

  const handleClickNext = useCallback(() => {
    const updatedPage = page === data?.total_pages ? page : page + 1;
    handleChangePage(updatedPage);
  }, [data?.total_pages, handleChangePage, page]);

  const handleClickPrev = useCallback(() => {
    const updatedPage = page === 0 ? page : page - 1;
    handleChangePage(updatedPage);
  }, [handleChangePage, page]);

  return {
    handleChangePage,
    handleChangeQuery,
    handleClickNext,
    handleClickPrev,
  };
}

function SearchResults({
  query,
  data,
  isLoading,
  pageNavButtonProps,
}: {
  query: string;
  data:
    | {
        total_results?: number;
        results?: Array<{
          id: number;
          poster_path?: string;
          profile_path?: string;
          media_type: string;
          title?: string;
          name?: string;
        }>;
      }
    | undefined;
  isLoading: boolean;
  pageNavButtonProps: PageNavButtonProps;
}) {
  if (!query || query.length === 0) {
    return <Text textAlign="center">Type something...</Text>;
  }
  if (data?.total_results === 0) {
    return <Text textAlign="center">No Result</Text>;
  }
  return (
    <>
      <PageNavButtons {...pageNavButtonProps} />
      <Skeleton loading={!!isLoading} marginY={8}>
        <Grid
          columnGap={8}
          rowGap={12}
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(4, 1fr)',
          ]}
        >
          {(data?.results ?? []).map((item) => (
            <PosterCard
              id={item.id}
              imageUrl={item.poster_path ?? item.profile_path ?? ''}
              key={`${item.media_type}-${item.id}`}
              layout="grid"
              mediaType={item.media_type as never}
              name={item.title ?? item.name}
            />
          ))}
        </Grid>
      </Skeleton>
      <PageNavButtons {...pageNavButtonProps} />
    </>
  );
}

const MultiSearchPageInner = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { data, isLoading, page, query } = useMultiSearchParams();
  const { handleChangeQuery, handleClickNext, handleClickPrev } =
    useMultiSearchNavigation(page, data, pathname, router);

  const pageNavButtonProps: PageNavButtonProps = useMemo(
    () => ({
      isLoading,
      onClickNext: handleClickNext,
      onClickPrev: handleClickPrev,
      page,
      totalPages: data?.total_pages ?? 0,
    }),
    [data?.total_pages, handleClickNext, handleClickPrev, isLoading, page]
  );

  return (
    <Grid gap={4} paddingX={8}>
      <Input
        borderRadius={24}
        defaultValue={query}
        fontSize="sm"
        onChange={handleChangeQuery}
        placeholder="Movie / TV Show / Person"
        type="text"
      />
      <SearchResults
        data={data as never}
        isLoading={isLoading}
        pageNavButtonProps={pageNavButtonProps}
        query={query}
      />
    </Grid>
  );
};

export const MultiSearchPage = () => (
  <Suspense
    fallback={
      <Flex align="center" justify="center" paddingY={16}>
        <Spinner size="xl" />
      </Flex>
    }
  >
    <MultiSearchPageInner />
  </Suspense>
);
