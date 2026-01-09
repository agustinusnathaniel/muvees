'use client';

import type { MovieListModeKey } from 'lib/components/movie/list/types';
import PageNavButtons, {
  type PageNavButtonProps,
} from 'lib/components/shared/list/page-nav-buttons';
import type { ListType } from 'lib/services/tmdb/movie/list/types';
import { useRouter, useSearchParams } from 'next/navigation';

export type MovieListPageNavButtonProps = Omit<
  PageNavButtonProps,
  'onClickNext' | 'onClickPrev'
> & {
  listMode: MovieListModeKey;
  section?: ListType;
  genre?: string;
};

export const MovieListPageNavButtons = ({
  isLoading,
  page = 0,
  totalPages,
  listMode,
  section,
  genre,
}: MovieListPageNavButtonProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChangePage = (type: 'next' | 'prev') => () => {
    const changePageNum = type === 'next' ? page + 1 : page - 1;

    const currentSearchParams = new URLSearchParams(searchParams.toString());
    currentSearchParams.set('page', changePageNum.toString());

    const nextRoute = () => {
      switch (listMode) {
        case 'section':
          return `/movies/${section}?${currentSearchParams.toString()}` as const;
        case 'search':
          return `/movies/search?${currentSearchParams.toString()}` as const;
        case 'discover':
          return `/movies/genre/${genre}?${currentSearchParams.toString()}` as const;
        default:
          return `/movies/${section}?${currentSearchParams.toString()}` as const;
      }
    };

    router.push(nextRoute());
  };

  return (
    <PageNavButtons
      isLoading={isLoading}
      onClickNext={handleChangePage('next')}
      onClickPrev={handleChangePage('prev')}
      page={page}
      totalPages={totalPages}
    />
  );
};
