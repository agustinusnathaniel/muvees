'use client';

import { Grid, Heading, Text } from '@chakra-ui/react';
import type { PageNavButtonProps } from 'lib/components/shared/list/page-nav-buttons';
import PageNavButtons from 'lib/components/shared/list/page-nav-buttons';
import TvShowListContainer from 'lib/components/tv/TvShowListContainer';
import { useTVShowByList } from 'lib/services/tmdb/tv/list/index.client';
import type { TVShowListType } from 'lib/services/tmdb/tv/list/types';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type TVShowListPageProps = {
  listType: TVShowListType;
};

const TVShowList = ({ listType }: TVShowListPageProps) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const qPage = searchParams.get('page');
  const page = qPage && Number(qPage) > 0 ? Number(qPage) : 1;

  const { data, isLoading } = useTVShowByList({
    listType,
    params: { page },
  });

  const handleChangePage = (updatedPage: number) => {
    push(`${pathname}?page=${updatedPage}`);
  };

  const handleClickNext = () => {
    const updatedPage = page === data?.total_pages ? page : page + 1;
    handleChangePage(updatedPage);
  };
  const handleClickPrev = () => {
    const updatedPage = page === 0 ? page : page - 1;
    handleChangePage(updatedPage);
  };

  const pageNavButtonProps: PageNavButtonProps = {
    isLoading,
    page,
    totalPages: data?.total_pages ?? 0,
    onClickNext: handleClickNext,
    onClickPrev: handleClickPrev,
  };

  return (
    <Grid gap={4} paddingX={8}>
      <Grid gap={2}>
        <Heading>TV Shows</Heading>
        <Text textTransform="capitalize">{listType.replaceAll('_', ' ')}</Text>
      </Grid>
      <PageNavButtons {...pageNavButtonProps} />
      <TvShowListContainer isLoading={isLoading} shows={data?.results} />
      <PageNavButtons {...pageNavButtonProps} />
    </Grid>
  );
};

export default TVShowList;
