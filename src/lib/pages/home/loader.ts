import type { HomePageProps } from 'lib/pages/home/types';
import { getMovieListServer } from 'lib/services/tmdb/movie/list/index.server';
import { getTVShowByListType } from 'lib/services/tmdb/tv/list/index.server';
import type { GetStaticProps } from 'next';

// eslint-disable-next-line import/prefer-default-export
export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  try {
    const popularMovieData = await getMovieListServer('popular');
    const popularTvShowData = await getTVShowByListType('popular');

    return {
      props: {
        popularMovieData,
        popularTvShowData,
      },
      revalidate: 43_200,
    };
  } catch {
    return { notFound: true };
  }
};
