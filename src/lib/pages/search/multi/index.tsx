import { Grid, Input, Skeleton, Text } from '@chakra-ui/react';
import type { PageNavButtonProps } from 'lib/components/shared/list/page-nav-buttons';
import PageNavButtons from 'lib/components/shared/list/page-nav-buttons';
import PosterCard from 'lib/components/shared/PosterCard';
import { BASE_URL } from 'lib/constants/baseUrl';
import { useMultiSearchResult } from 'lib/services/tmdb/search/multi/index.client';
import debounce from 'lodash/debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

const MultiSearchPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const qPage = searchParams.get('page');
  const qQuery = searchParams.get('query');
  const page = qPage && Number(qPage) > 0 ? Number(qPage) : 1;
  const query = qQuery as string;

  const { data, isLoading } = useMultiSearchResult(
    {
      page,
      query,
    },
    query?.length > 0
  );

  const handleChangeQuery = useCallback(
    debounce((e: React.ChangeEvent<HTMLInputElement>) => {
      const queryParam = e.target.value
        ? `?query=${e.target.value}&page=1`
        : '';

      router.push(`/search${queryParam}`);
    }, 500),
    []
  );

  const handleChangePage = useCallback(
    (updatedPage: number) => {
      const queryParams = new URL(BASE_URL + pathname).searchParams;
      queryParams.set('page', updatedPage.toString());
      router.push(`${pathname}?${queryParams.toString()}`);
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

  const pageNavButtonProps: PageNavButtonProps = useMemo(
    () => ({
      isLoading,
      page,
      totalPages: data?.total_pages ?? 0,
      onClickNext: handleClickNext,
      onClickPrev: handleClickPrev,
    }),
    [data?.total_pages, handleClickNext, handleClickPrev, isLoading, page]
  );

  const resultWrapper = useMemo(() => {
    if (!query || query.length === 0) {
      return <Text textAlign="center">Type something...</Text>;
    }

    if (data?.total_results === 0) {
      return <Text textAlign="center">No Result</Text>;
    }

    return (
      <>
        <PageNavButtons {...pageNavButtonProps} />
        <Skeleton loading={!isLoading} marginY={8}>
          <Grid
            columnGap={8}
            rowGap={12}
            templateColumns={[
              'repeat(2, 1fr)',
              'repeat(3, 1fr)',
              'repeat(4, 1fr)',
            ]}
          >
            {data?.results.map((item) => (
              <PosterCard
                id={item.id}
                imageUrl={item.poster_path ?? item.profile_path ?? ''}
                key={`${item.media_type}-${item.id}`}
                layout="grid"
                mediaType={item.media_type}
                name={item.title ?? item.name}
              />
            ))}
          </Grid>
        </Skeleton>
        <PageNavButtons {...pageNavButtonProps} />
      </>
    );
  }, [
    data?.results,
    data?.total_results,
    isLoading,
    pageNavButtonProps,
    query,
  ]);

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
      {resultWrapper}
    </Grid>
  );
};

export default MultiSearchPage;
